import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
  MatSidenav,
  MatSidenavContainer, MatSidenavContent
} from '@angular/material/sidenav';
import {MatListItem, MatListItemIcon, MatNavList} from '@angular/material/list';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

export const MATERIAL_BASICS = [
  MatIcon,
  MatIconButton,
  MatButton,
  MatInput,
  MatFabButton
];

export const MATERIAL_DASHBOARD = [
  MatToolbar,
];

export const MATERIAL_NAVBAR = [
  MatSidenav,
  MatSidenavContainer,
  MatListItem,

  MatDrawerContainer,
  MatDrawer,
  MatDrawerContent,
  MatNavList,
  MatSidenavContent,
  MatListItemIcon,

  MatMenu,
  MatMenuTrigger,
  MatMenuItem

];
