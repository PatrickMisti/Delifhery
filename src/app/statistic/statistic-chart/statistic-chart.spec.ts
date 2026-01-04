import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticChart } from './statistic-chart';

describe('StatisticChart', () => {
  let component: StatisticChart;
  let fixture: ComponentFixture<StatisticChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
