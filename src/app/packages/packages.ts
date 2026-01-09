import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {MATERIAL_FORM, MATERIAL_TABLE} from '../../material-import';
import {PackageList} from './package-list/package-list';
import UserService from '../../core/services/user.service';
import {ShipmentService} from '../../core/services/shipment.service';
import {Disposabled} from '../../core/utilities/disposabled';
import {User} from '../../core/models/user';
import {GetAllShipmentsDto} from '../../core/services/dto/get-all-shipments-dto';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Shipment} from '../../core/models/shipment';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-packages',
  imports: [
    ...MATERIAL_TABLE,
    ...MATERIAL_FORM,
    PackageList,
    MatProgressSpinner,
    AsyncPipe
  ],
  templateUrl: './packages.html',
})
export class Packages extends Disposabled implements OnDestroy, OnInit {

  private _userService = inject(UserService);
  private _shipmentService = inject(ShipmentService);

  isLoggedIn = signal<boolean>(false);
  private _currentUser: User | null = null;
  shipmentsLoading$?: Observable<GetAllShipmentsDto>;

  constructor() {
    super();
    effect(() => {
      if (this.isLoggedIn()) {
        this._getShipments();
      }
    });
  }

  ngOnInit(): void {
    this.subSink = this._userService.isCurrentUser$()
      .subscribe(isCurrentUser => {
        if (this.isLoggedIn() || isCurrentUser == null) return;
        this.isLoggedIn.set(!!isCurrentUser);
        this._currentUser = isCurrentUser;
      });

    if (this._userService.isCurrentUser$()?.value) {
      this.isLoggedIn.set(true);
      this._currentUser = this._userService.isCurrentUser$().value;
    }
  }

  getAllShipmentsTogether(shipments: GetAllShipmentsDto | null): Shipment[] {
    const data = shipments?.sendShipment ?? [];
    data.push(...shipments?.receiveShipment ?? []);
    return data;
  }

  private _getShipments() {
    if (this._currentUser == null) {
      return;
    }

    this.shipmentsLoading$ = this._shipmentService.getAllShipments(this._currentUser.userId);
  }

  ngOnDestroy(): void {
    super.dispose();
  }
}
