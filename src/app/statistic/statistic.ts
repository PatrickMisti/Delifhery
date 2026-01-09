import {Component} from '@angular/core';
import 'chart.js/auto';
import {ChartData} from 'chart.js';
import {StatisticChart} from './statistic-chart/statistic-chart';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [
    StatisticChart
  ],
  templateUrl: './statistic.html',
})
export class Statistic {

  chartData: ChartData = {
    labels: [
      'Erfolgreich',
      'Gescheitert'
    ],
    datasets: [{
      data: [300, 50],
      backgroundColor: [''],
      hoverOffset: 4
    }]
  };




}
