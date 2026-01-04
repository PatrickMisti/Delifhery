import {AfterViewInit, Component, computed, effect, signal, ViewChild} from '@angular/core';
import {MATERIAL_FORM} from '../../material-import';
import {BaseChartDirective} from 'ng2-charts';
import 'chart.js/auto';
import {ChartData} from 'chart.js';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [
    ...MATERIAL_FORM,
    BaseChartDirective
  ],
  templateUrl: './statistic.html',
})
export class Statistic implements AfterViewInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  isDarkMode = signal(false);

  primary = computed(() => this.isDarkMode() ? '#324B4BFF' : '#B0CCCBFF')
  secondary = computed(() => this.isDarkMode() ? '#74565DFF' : '#FFD9E1FF')

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

  colorEffect = effect(() => {
    this.chartData.datasets[0].backgroundColor = [this.primary(), this.secondary()];
    queueMicrotask(() => this.chart?.update());
  });

  ngAfterViewInit() {
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
