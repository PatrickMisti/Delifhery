import {Component, computed, signal} from '@angular/core';
import {MATERIAL_BASICS} from '../../material-import';

@Component({
  selector: 'app-nav-bar',
  imports: [...MATERIAL_BASICS],
  templateUrl: './nav-bar.html',
})
export class NavBar {
  _isNavOpen = signal(false);
  navOpen = computed(() => this._isNavOpen());

  toggleNavbar = () => this._isNavOpen.update(value => !value);

  openNavBar() {
    this.toggleNavbar();
  }
}
