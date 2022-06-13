import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { UserActivityData, UserActive, ActivityAction } from '../../../@core/data/user-activity';

@Component({
  selector: 'ngx-user-activity',
  styleUrls: ['./user-activity.component.scss'],
  templateUrl: './user-activity.component.html',
})
export class ECommerceUserActivityComponent implements OnDestroy {

  private alive = true;

  userActivity: ActivityAction[] = [];
  type = 'All';
  types = ['All','Cliques', 'Vue'];
  currentTheme: string;

  constructor(private themeService: NbThemeService,
              private userActivityService: UserActivityData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });

    this.getUserActivity('week');
  }

  getUserActivity(period: string) {
    this.userActivityService.getUserActivityData('week')
      .pipe(takeWhile(() => this.alive))
      .subscribe(userActivityData => {
        this.userActivity = userActivityData;
      });
      console.log(this.userActivity)
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
