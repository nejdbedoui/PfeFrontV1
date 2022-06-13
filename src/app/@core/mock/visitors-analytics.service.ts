import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { PeriodsService } from './periods.service';
import { OutlineData, VisitorsAnalyticsData } from '../data/visitors-analytics';

@Injectable()
export class VisitorsAnalyticsService extends VisitorsAnalyticsData {

  constructor(private periodService: PeriodsService) {
    super();
  }

  private pieChartValue = 75;
  private innerLinePoints: number[] = [
    28,29,30,32,33,34,32
  ];
  private outerLinePoints: number[] = [
    175, 182,190, 198, 205, 213, 221,
  ];
  private generateOutlineLineData(): OutlineData[] {
    const months = this.periodService.getWeeks();
    const outerLinePointsLength = this.outerLinePoints.length;
    const monthsLength = months.length;

    return this.outerLinePoints.map((p, index) => {
      const monthIndex = Math.round(index / 1);
      const label = (index % Math.round(outerLinePointsLength / monthsLength) === 0)
        ? months[monthIndex]
        : '';

      return {
        label,
        value: p,
      };
    });
  }

  getInnerLineChartData(): Observable<number[]> {
    return observableOf(this.innerLinePoints);
  }

  getOutlineLineChartData(): Observable<OutlineData[]> {
    return observableOf(this.generateOutlineLineData());
  }

  getPieChartData(): Observable<number> {
    return observableOf(this.pieChartValue);
  }
}
