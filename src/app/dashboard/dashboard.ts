import {Component, computed, signal} from '@angular/core';
import {MATERIAL_BASICS, MATERIAL_DASHBOARD, MATERIAL_NAVBAR} from '../../material-import';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    MATERIAL_BASICS,
    MATERIAL_DASHBOARD,
    MATERIAL_NAVBAR,
    NgClass
  ],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard {
  drawer = signal(false);
  isOpenDrawer = computed(() => this.drawer());

  toggleDrawer() {
    this.drawer.update((value) => !value);
  }
}
