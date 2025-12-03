import { Component } from '@angular/core';
import {MATERIAL_DASHBOARD} from '../../material-import';

@Component({
  selector: 'app-dashboard',
  imports: [
    ...MATERIAL_DASHBOARD,
  ],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard {

}
