import {Component, input} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MATERIAL_FORM} from '../../../material-import';

@Component({
  selector: 'app-statistic-chart',
  imports: [
    BaseChartDirective,
    ...MATERIAL_FORM
  ],
  templateUrl: './statistic-chart.html',
})
export class StatisticChart {
  title = input.required<string>();
  chartType = input.required<'bar' | 'doughnut'>();
}
