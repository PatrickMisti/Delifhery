import {Routes} from '@angular/router';
import {Packages} from './packages/packages';
import {Calculator} from './calculator/calculator';
import {Statistic} from './statistic/statistic';
import {AddPackage} from './add-package/add-package';
import {authGuard} from '../core/services/can-activate-user-guard.service';

export const routes: Routes = [
  {path: '', redirectTo: 'packages', pathMatch: 'full'},
  {path: 'add', component: AddPackage, canActivate: [authGuard]},
  {path: "packages", component: Packages},
  {path: "calc", component: Calculator},
  {path: "statistics", component: Statistic},
  {path: "**", redirectTo: "packages"},
];
