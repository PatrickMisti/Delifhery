import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Shipment} from '../../../core/models/shipment';
import {ShipmentBillDialog} from '../../utilities/open-dialog.widget';
import {MATERIAL_BASICS, MATERIAL_FORM} from '../../../material-import';
import {MatDivider} from '@angular/material/list';
import {PaymentStatus} from '../../../core/models/enum-types';
import {CreatePaymentDto} from '../../../core/services/dto/create-shipment-bill-dto';
import {ShipmentService} from '../../../core/services/shipment.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-package-item',
  imports: [
    ...MATERIAL_FORM,
    ...MATERIAL_BASICS,
    MatDivider
  ],
  templateUrl: './package-item.html',
  styles: ``,
})
export class PackageItem {
  private _dialog = inject(MatDialogRef<Shipment>);
  protected data = inject<ShipmentBillDialog>(MAT_DIALOG_DATA);

  private _shipmentService = inject(ShipmentService);
  private _snackbar = inject(MatSnackBar);

  closeDialog(): void {
    console.log("Shipment", this.data.shipment);
    this._dialog.close();
  }

  sortStatusEntries() {
    return this.data.shipment.statusHistory
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  protected readonly PaymentStatus = PaymentStatus;

  payment() {
    const paymentDto: CreatePaymentDto = {
      shipmentId: this.data.shipment.shipmentId,
      redirectUrl: window.location.origin + window.location.pathname,
    };

    this._shipmentService.createPayment(paymentDto)
      .subscribe(response => {
        if (!response) {
          this._snackbar
            .open("Zahlung konnte nicht initialisiert werden.", "Schließen", { duration: 5000 });
          return;
        }

        console.log(response);
        window.location.href = response.paymentUrl;
      })
  }
}
