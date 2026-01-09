import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import 'chart.js/auto';
import {ChartData} from 'chart.js';
import {StatisticChart} from './statistic-chart/statistic-chart';
import {Disposabled} from '../../core/utilities/disposabled';
import {ShipmentService} from '../../core/services/shipment.service';
import UserService from '../../core/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from '../../core/models/user';
import {LoadingWidget} from '../utilities/loading.widget';
import {from, Observable, switchMap, tap} from 'rxjs';
import {GetAllShipmentsDto} from '../../core/services/dto/get-all-shipments-dto';
import {AsyncPipe} from '@angular/common';
import {Shipment} from '../../core/models/shipment';
import {PaymentStatus, ShipmentStatus} from '../../core/models/enum-types';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [
    StatisticChart,
    AsyncPipe,
  ],
  templateUrl: './statistic.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Statistic extends Disposabled implements OnInit, OnDestroy {
  private _shipmentService = inject(ShipmentService);
  private _userService = inject(UserService);
  private _snackBar = inject(MatSnackBar);
  private _loading = inject(LoadingWidget);

  protected isLoading$?: Observable<GetAllShipmentsDto>;
  private _colors = ['#324B4BFF', '#74565DFF', '#B0CCCBFF', '#FFD9E1FF', '#FF7F50FF', '#6A5ACDFF', '#20B2AAFF', '#FF6347FF'];

  ngOnInit(): void {
    this._loading.end();
    this.isLoading$ = this._userService.isCurrentUser$()
      .pipe(
        tap(currentUser => {
          if (currentUser) return;
          this._makeSnakeBarMessage("Bitte melden Sie sich an, um Statistiken zu sehen.");
          throw new Error("User not logged in");
        }),
        switchMap(user => {
          if (!user) return from([]);
          return this._loadShipments(user);
        })
      );
  }

  private _loadShipments(user: User) {
    return this._shipmentService.getAllShipments(user.userId)
      .pipe(
        tap(shipments => {
          if (shipments.sendShipment.length == 0 && shipments.receiveShipment.length == 0) {
            this._makeSnakeBarMessage("Keine Sendungen gefunden, um Statistiken anzuzeigen.");
            throw new Error("No Shipments found");
          }
        })
      );
  }

  private _makeSnakeBarMessage(message: string): void {
    this._snackBar.open(message, "Schließen", {duration: 5000});
    this._loading.end();
  }

  processShipmentsForShipmentStatus(shipments: Shipment[]): ChartData {
    return this._buildChartData(
      Object.values(ShipmentStatus),
      Object.values(ShipmentStatus).map(item => {
        return shipments.filter(shipment => shipment.currentStatus === item).length;
      }));
  }

  processPaymentStatus(shipments: Shipment[]): ChartData {
    return this._buildChartData(
      Object.values(PaymentStatus),
      Object.values(PaymentStatus).map(item => {
        return shipments.filter(shipment => shipment.paymentStatus === item).length;
      }),
      "Zahlungsstatus");
  }

  processGroupByPlz(shipments: Shipment[]): ChartData {
    const plzMap: {[key: string]: number} = {};

    shipments.forEach(shipment => {
      const plz = shipment.receiverAddress.postalCode;
      plzMap[plz] = plz in plzMap ? plzMap[plz] + 1 : 1;
    });

    return this._buildChartData(
      plzMap ? Object.keys(plzMap) : [],
      plzMap ? Object.values(plzMap) : [],
      "Pakete nach PLZ");
  }

  private _buildChartData(labels: string[], data: number[], label?: string): ChartData {
    return {
      labels: labels,
      datasets: [{
        label: label ?? labels[0],
        data: data,
        backgroundColor: labels.map((_, index) => {
          return this._colors[index % this._colors.length];
        }),
        hoverOffset: 4
      }]
    };
  }

  ngOnDestroy(): void {
    this.dispose();
  }
}
