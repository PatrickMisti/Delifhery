import {AfterViewInit, Component, computed, effect, input, signal, ViewChild} from '@angular/core';
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
export class StatisticChart implements AfterViewInit {
  title = input.required<string>();
  chartType = input.required<'bar' | 'doughnut'>();
  chartData = input.required<ChartData>();

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  isDarkMode = signal(false);

  primary = computed(() => this.isDarkMode() ? '#324B4BFF' : '#B0CCCBFF')
  secondary = computed(() => this.isDarkMode() ? '#74565DFF' : '#FFD9E1FF')

  constructor() {
    effect(() => {
      this.chartData().datasets[0].backgroundColor = [this.primary(), this.secondary()];
      queueMicrotask(() => this.chart?.update());
    });
  }

  ngAfterViewInit(): void {
    const html = document.documentElement;

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const classList = (mutation.target as HTMLElement).classList;
          this.isDarkMode.set(classList.contains('dark-theme'));
        }
      });
    });

    this.isDarkMode.set(html.classList.contains('dark-theme'));

    observer.observe(html, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
}
