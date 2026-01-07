import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Shipment} from '../../../core/models/shipment';

@Component({
  selector: 'app-package-item',
  imports: [],
  templateUrl: './package-item.html',
  styles: ``,
})
export class PackageItem {
  private _dialog = inject(MatDialogRef<Shipment>);
  protected data = inject<Shipment>(MAT_DIALOG_DATA);

  closeDialog(): void {
    this._dialog.close();
  }
}
