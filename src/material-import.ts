import {MatIcon} from '@angular/material/icon';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
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
import {MatStep, MatStepper, MatStepperIcon, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatSlider} from '@angular/material/slider';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatTab, MatTabGroup} from '@angular/material/tabs';

export const MATERIAL_BASICS = [
  MatIcon,
  MatIconButton,
  MatButton,
  MatInput,
  MatFabButton,
  MatSlider,
  MatSlideToggle
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

export const MATERIAL_STEPPER = [
  MatStepper,
  MatStep,
  MatStepperPrevious,
  MatStepperNext,
  MatStepperIcon
];

export const MATERIAL_FORM = [
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,

  MatInput,
  MatFormField,
  MatLabel,

  MatCheckbox,
  MatHint,
  MatError,
  MatCardActions
];

export const MATERIAL_TABLE = [
  MatTabGroup,
  MatTab,
  MatTable,
  MatColumnDef,
  MatRowDef,
  MatHeaderCell,
  MatCell,
  MatHeaderRow,
  MatRow,
  MatHeaderCellDef,
  MatCellDef,
  MatHeaderRowDef
];
