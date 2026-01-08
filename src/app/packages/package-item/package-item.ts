import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Shipment} from '../../../core/models/shipment';
import {ShipmentBillDialog} from '../../utilities/open-dialog.widget';
import {MATERIAL_BASICS, MATERIAL_FORM} from '../../../material-import';
import {MatDivider} from '@angular/material/list';
import {PaymentStatus} from '../../../core/models/enum-types';

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

  closeDialog(): void {
    this._dialog.close();
  }

  sortStatusEntries() {
    return this.data.shipment.statusHistory
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  protected readonly PaymentStatus = PaymentStatus;

  payment() {

  }
}
