import { Component } from '@angular/core';
import {MATERIAL_DASHBOARD} from '../../material-import';
import {NavBar} from '../nav-bar/nav-bar';

@Component({
  selector: 'app-dashboard',
  imports: [
    ...MATERIAL_DASHBOARD,
    NavBar,
  ],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard {

}
