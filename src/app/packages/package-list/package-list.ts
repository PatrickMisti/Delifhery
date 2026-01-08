import {Component, inject, input} from '@angular/core';
import {MATERIAL_TABLE} from '../../../material-import';
import {Shipment} from '../../../core/models/shipment';
import {OpenDialogWidget, ShipmentBillDialog} from '../../utilities/open-dialog.widget';
import {PackageItem} from '../package-item/package-item';
import {ShipmentService} from '../../../core/services/shipment.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-package-list',
  imports: [
    ...MATERIAL_TABLE
  ],
  templateUrl: './package-list.html',
  styles: ``,
})
export class PackageList {
  displayedColumns: string[] = ['receivername', 'price', 'status', 'billstatus'];
  dataSource = input<Shipment[]>();

  private _shipments = inject(ShipmentService)
  private _dialog = inject(OpenDialogWidget);
  private _snackbar = inject(MatSnackBar);

  selectedShipment(shipment: Shipment) {
    this._shipments.createShipmentBill({
      shipmentId: shipment.shipmentId,
      trackingNumber: shipment.trackingNumber,
      redirectUrl: window.location.origin + window.location.pathname
    }).subscribe(bill => {
      if (!bill){
        this._snackbar.open("Rechnung konnte nicht erstellt werden.", 'OK', {duration: 3000});
      }
      shipment.shipmentId = bill!.id;
      this.showShipmentDetails({
        shipment: shipment,
        bill: bill?.res ?? null,
      })
    });
  }

  showShipmentDetails(item: ShipmentBillDialog) {
    this._dialog.openDialog(PackageItem, item, false);
  }
}
