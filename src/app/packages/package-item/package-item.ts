import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Shipment} from '../../../core/models/shipment';
import {ShipmentBillDialog} from '../../utilities/open-dialog.widget';
import {MATERIAL_FORM} from '../../../material-import';

@Component({
  selector: 'app-package-item',
  imports: [
    ...MATERIAL_FORM
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
}
