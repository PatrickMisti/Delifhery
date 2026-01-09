import {Routes} from '@angular/router';
import {Packages} from './packages/packages';
import {Calculator} from './calculator/calculator';
import {Statistic} from './statistic/statistic';
import {AddPackage} from './add-package/add-package';
import {authGuard} from '../core/services/can-activate-user-guard.service';

export const routes: Routes = [
  {path: '', redirectTo: 'add', pathMatch: 'full'},
  {path: 'add', component: AddPackage},
  {path: "packages", component: Packages, canActivate: [authGuard]},
  {path: "calc", component: Calculator},
  {path: "statistics", component: Statistic},
  {path: "**", redirectTo: "packages"},
];
