import {Component, input, InputSignal} from '@angular/core';
import {MATERIAL_TABLE} from '../../../material-import';
import {Shipment} from '../../../core/models/shipment';

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
}
