import {MatDialog} from '@angular/material/dialog';
import {inject, Injectable} from '@angular/core';
import {ComponentType} from '@angular/cdk/portal';
import {Observable} from 'rxjs';
import {GeneralDialogWidget, ResultDialogWidget} from './general-dialog.widget';
import {AddPackageDialogWidget} from './add-package-dialog.widget';
import {Shipment} from '../../core/models/shipment';
import {GetShipmentBillDto} from '../../core/services/dto/create-shipment-bill-dto';


@Injectable({
  providedIn: 'root',
})
export class OpenDialogWidget {

  private readonly _dialog = inject(MatDialog);

  openDialog<T,D = DialogMessage, R = DialogMessageResponse>(type: ComponentType<T>, data?: D, disableOutBound: boolean = true): Observable<R | undefined> {
    const dialogRef = this._dialog.open<T,D,R>(type,{
      data: data,
      disableClose: disableOutBound,
      minWidth: '400px',

    });

    return dialogRef.afterClosed();
  }

  openDefaultDialog<D = DialogMessage, R = DialogMessageResponse>(data?: D): Observable<R | undefined> {
    return this.openDialog(GeneralDialogWidget, data);
  }

  openResultDialog<D = DataDialog, R = DialogMessageResponse>(data?: D): Observable<R | undefined> {
    return this.openDialog(ResultDialogWidget, data, false);
  }

  openShipmentDialog<D = ShipmentDialog, R = DialogMessageResponse>(data?: D): Observable<R | undefined> {
    return this.openDialog(AddPackageDialogWidget, data);
  }
}

export interface DialogMessage {}

export interface DialogMessageResponse {}

export class DataDialog implements DialogMessage  {
  public title: string;
  public message: string;

  constructor(title: string, message: string) {
    this.title = title;
    this.message = message;
  }
}

export class ShipmentDialog implements DialogMessage {
  public shipmentId: number;
  public title: string;
  public message: string;
  public qrCodeData: string;
  public price: number;
  public trackingNumber: string;

  constructor(shipmentId: number, title: string, message: string, qrCodeData: string, price: number, trackingNumber: string) {
    this.shipmentId = shipmentId;
    this.title = title;
    this.message = message;
    this.qrCodeData = qrCodeData;
    this.price = price;
    this.trackingNumber = trackingNumber;
  }
}

export class ShipmentBillDialog implements DialogMessage {
  public shipment: Shipment;
  public bill: GetShipmentBillDto | null;

  constructor(shipment: Shipment, bill?: GetShipmentBillDto) {
    this.shipment = shipment;
    this.bill = bill ?? null;
  }
}

export enum ShowShipmentOrPayment {
  SHOW_SHIPMENT,
  SHOW_PAYMENT,
  NOTHING
}
