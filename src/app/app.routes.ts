import {Routes} from '@angular/router';
import {Packages} from './packages/packages';
import {Calculator} from './calculator/calculator';
import {Statistic} from './statistic/statistic';

export const routes: Routes = [
  {path: '', redirectTo: 'packages', pathMatch: 'full'},
  {path: "packages", component: Packages},
  {path: "calc", component: Calculator},
  {path: "statistics", component: Statistic},
  {path: "**", redirectTo: "packages"},
];
