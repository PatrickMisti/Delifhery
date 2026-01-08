import {Component, computed, DOCUMENT, inject, input, OnDestroy, signal} from '@angular/core';
import {MATERIAL_BASICS, MATERIAL_DASHBOARD, MATERIAL_NAVBAR} from '../../material-import';
import {NgClass} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import UserService from '../../core/services/user.service';
import {Disposabled} from '../../core/utilities/disposabled';
import {User} from '../../core/models/user';
import {OpenDialogWidget} from '../utilities/open-dialog.widget';
import {UserSite} from './user-site/user-site';

@Component({
  selector: 'app-dashboard',
  imports: [
    MATERIAL_BASICS,
    MATERIAL_DASHBOARD,
    MATERIAL_NAVBAR,
    NgClass,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard extends Disposabled implements OnDestroy {
  title = input<String>();

  drawer = signal(false);
  isOpenDrawer = computed(() => this.drawer());

  themeMode = signal(false);
  isDarkMode = computed(() => this.themeMode());
  document: Document = inject(DOCUMENT);
  isActivateRoute = signal<string>('');

  private userService = inject(UserService);
  currentUser = signal<User | null>(null);

  private _dialog = inject(OpenDialogWidget);

  constructor() {
    super();
    this.registration();
  }

  registration(): void {
    this.subSink = this.userService.isCurrentUser$().subscribe(currentUser => {
      this.currentUser.set(currentUser);
    });

    this.currentUser.set(this.userService.isCurrentUser$().value);

    if (this.userService.isAuthenticated()){
      this.userService.loadCurrentUser().then();
    }
  }

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

  changeComponent(event:any) {
    console.log(event);
  }

  goToProfile() {
    this._dialog.openDialog(UserSite);
  }

  async login() {
    await this.userService.login();
  }

  async logout() {
    await this.userService.logout();
    console.log('Logged out');
  }

  setActivatedRoute(route: string) {
    console.log(route);
    this.isActivateRoute.set(route);
  }

  ngOnDestroy(): void {
    this.dispose();
  }
}
