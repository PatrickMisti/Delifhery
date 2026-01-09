import {Component, input} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {MATERIAL_FORM} from '../../../material-import';
import {ChartData} from 'chart.js';

@Component({
  selector: 'app-statistic-chart',
  imports: [
    ...MATERIAL_FORM,
    BaseChartDirective
  ],
  templateUrl: './statistic-chart.html',
})
export class StatisticChart {
  title = input.required<string>();
  chartType = input.required<'bar' | 'doughnut'>();
  chartData = input.required<ChartData>();
}
