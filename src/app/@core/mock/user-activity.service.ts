import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';
import { PeriodsService } from './periods.service';
import { ActivityAction, UserActive, UserActivityData } from '../data/user-activity';

@Injectable()
export class UserActivityService extends UserActivityData {

  private getRandom = (roundTo: number) => Math.round(Math.random() * roundTo);
  private generateUserActivityRandomData(date) {
    return {
      date:this.randomDate(new Date(2022,6,7),new Date()),
      Age: Math.floor(Math.random() * 39) + 17,
      Sexe: this.getRandom(1) % 2 === 0,
      Interaction: this.getRandom(1) % 2 === 0,
    };
  }
  
  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

  data = {};

   constructor(private periods: PeriodsService) {
    super();
    this.data = {
       week: this.getDataWeek(),
     };
   }

  private getDataWeek(): ActivityAction[] {
   return this.periods.getWeeks().map((week) => {
       return this.generateUserActivityRandomData(week);
     });
   }

  // private getDataMonth(): ActivityAction[] {
  //   const currentDate = new Date();
  //   const days = currentDate.getDate();
  //   const month = this.periods.getMonths()[currentDate.getMonth()];

  //   return Array.from(Array(days)).map((_, index) => {
  //     const date = `${index + 1} ${month}`;

  //     return this.generateUserActivityRandomData(date);
  //   });
  // }

  // private getDataYear(): ActivityAction[] {
  //   return this.periods.getYears().map((year) => {
  //     return this.generateUserActivityRandomData(year);
  //   });
  // }

  getUserActivityData(period: string): Observable<ActivityAction[]> {
    return observableOf(this.data[period]);
  }
}
