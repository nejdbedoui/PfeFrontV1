import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { ActivityAction, UserActivityData } from '../../../@core/data/user-activity';

@Component({
  selector: 'ngx-dashboard-principale',
  templateUrl: './dashboard-principale.component.html',
  styleUrls: ['./dashboard-principale.component.scss']
})
export class DashboardPrincipaleComponent implements OnInit {

  ngOnInit() {
  }

  currentTheme: string;

  constructor(private themeService: NbThemeService,
              private userActivityService: UserActivityData) {



  }

  single: any[]=[
    {
      "name":"Vues Totale",
      "value":500
    },
    {
      "name":"Cliques Totale",
      "value":100
    },
    {
      "name":"Age Minimum Cliqué",
      "value":27
    },
    {
      "name":"Age Maximum Cliqué",
      "value":54
    },
  ];
  view: any[] = [200,400];

  colorScheme = {
    domain: ['#3366ff', '#00d68f', '#7366b2', '#333333', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#f0f4f4';
  
 
}
