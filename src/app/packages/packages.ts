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

@Component({
  selector: 'app-packages',
  imports: [
    ...MATERIAL_TABLE,
    ...MATERIAL_FORM,
    PackageList,
    MatProgressSpinner
  ],
  templateUrl: './packages.html',
})
export class Packages extends Disposabled implements OnDestroy, OnInit {

  private _userService = inject(UserService);
  private _shipmentService = inject(ShipmentService);

  isLoggedIn = signal<boolean>(false);
  private _currentUser: User | null = null;
  shipments = signal<GetAllShipmentsDto | null>(null)

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

  getAllShipmentsTogether(): Shipment[] {
    const data = this.shipments()?.sendShipment ?? [];
    data.push(...this.shipments()?.receiveShipment ?? []);
    return data;
  }

  private _getShipments() {
    if (this._currentUser == null) {
      return;
    }

    this.subSink = this._shipmentService.getAllShipments(this._currentUser.userId)
      .subscribe(shipments => {
        this.shipments.set(shipments);
      });
  }

  ngOnDestroy(): void {
    super.dispose();
  }
}
