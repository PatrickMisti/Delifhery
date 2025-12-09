import {Component, computed, DOCUMENT, inject, signal} from '@angular/core';
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

  themeMode = signal(false);
  isDarkMode = computed(() => this.themeMode());
  document: Document = inject(DOCUMENT);

  toggleDrawer() {
    this.drawer.update((value) => !value);
  }

  setDarkMode() {
    const html = this.document.documentElement;
    this.themeMode.update((value) => !value);

    if (this.isDarkMode()) {
      html.classList.add('dark-theme');
      html.style.colorScheme = 'dark';
    } else {
      html.classList.remove('dark-theme');
      html.style.colorScheme = 'light';
    }
  }
}
