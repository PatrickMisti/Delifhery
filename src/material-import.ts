import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';

export const MATERIAL_BASICS = [
  MatIcon,
  MatIconButton,
  MatButton,
  MatInput
];

export const MATERIAL_DASHBOARD = [
  ...MATERIAL_BASICS,
  MatToolbar,
];
