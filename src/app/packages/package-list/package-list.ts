import {Component, inject, input} from '@angular/core';
import {MATERIAL_TABLE} from '../../../material-import';
import {Shipment} from '../../../core/models/shipment';
import {OpenDialogWidget} from '../../utilities/open-dialog.widget';
import {PackageItem} from '../package-item/package-item';

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

  private _dialog = inject(OpenDialogWidget);

  selectedShipment(shipment: Shipment) {
    this._dialog.openDialog(PackageItem, shipment, false);
  }

}
