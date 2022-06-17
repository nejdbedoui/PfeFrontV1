import { Component, OnInit, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { OrdersChart } from '../../../@core/data/orders-chart';
import { OrderProfitChartSummary, OrdersProfitChartData } from '../../../@core/data/orders-profit-chart';
import { ProfitChart } from '../../../@core/data/profit-chart';
import { VisitorsAnalyticsData } from '../../../@core/data/visitors-analytics';
import { OrdersChartComponent } from '../../e-commerce/charts-panel/charts/orders-chart.component';
import { ProfitChartComponent } from '../../e-commerce/charts-panel/charts/profit-chart.component';


@Component({
  selector: 'ngx-dashboard-real-time',
  templateUrl: './dashboard-real-time.component.html',
  styleUrls: ['./dashboard-real-time.component.scss']
})
export class DashboardRealTimeComponent implements OnInit {
  private alive = true;
  pieChartValue: number;
  chartPanelSummary: OrderProfitChartSummary[];
  period: string = 'week';
  ordersChartData: OrdersChart;
  profitChartData: ProfitChart;

  @ViewChild('ordersChart', { static: true }) ordersChart: OrdersChartComponent;
  @ViewChild('profitChart', { static: true }) profitChart: ProfitChartComponent;

  ngOnInit(): void {
    
  }



  constructor(private ordersProfitChartService: OrdersProfitChartData,private visitorsAnalyticsChartService: VisitorsAnalyticsData) {
    this.ordersProfitChartService.getOrderProfitChartSummary()
      .pipe(takeWhile(() => this.alive))
      .subscribe((summary) => {
        this.chartPanelSummary = summary;
      });

    this.getOrdersChartData(this.period);
    this.getProfitChartData(this.period);
    this.getPieChartValue();
  }

  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

    this.getOrdersChartData(value);
    this.getProfitChartData(value);
   
  }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'Profit') {
      this.profitChart.resizeChart();
    } else {
      this.ordersChart.resizeChart();
    }
  }

  getOrdersChartData(period: string) {
    this.ordersProfitChartService.getOrdersChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(ordersChartData => {
        this.ordersChartData = ordersChartData;
      });
  }
      //this.pieChartValue = this.visitorsAnalyticsChartService.getPieChartData();
getPieChartValue(){
  this.visitorsAnalyticsChartService.getPieChartData().pipe(takeWhile(() => this.alive))
  .subscribe(profitChartData => {
    this.pieChartValue = profitChartData;
  });
}
  getProfitChartData(period: string) {
    this.ordersProfitChartService.getProfitChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(profitChartData => {
        this.profitChartData = profitChartData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
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
  view: any[] = [300,500];

  colorScheme = {
    domain: ['#3366ff', '#00d68f', '#7366b2', '#333333', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#f0f4f4';
  
 

  onSelect(event) {
    console.log(event);
  }
 












  // title = 'grokonez';
  // description = 'Angular-WebSocket Demo';

  // greetings: string[] = [];
  // disabled = true;
  // name: string;
  // private stompClient = null;

  // constructor() { }

  // setConnected(connected: boolean) {
  //   this.disabled = !connected;

  //   if (connected) {
  //     this.greetings = [];
  //   }
  // }

  // connect() {
  //   const socket = new SockJS('http://localhost:8080/gkz-stomp-endpoint');
  //   this.stompClient = Stomp.over(socket);

  //   const _this = this;
  //   this.stompClient.connect({}, function (frame) {
  //     _this.setConnected(true);
  //     console.log('Connected: ' + frame);
  //     _this.stompClient.subscribe('/topic/hi', function (hello) {
  //         console.log("yraja3")
  //       _this.showGreeting(JSON.parse(hello.body).greeting);
  //      // _this.showGreeting(JSON.parse(hello.body).greeting);
  //     });
  //   });
  // }

  // disconnect() {
  //   if (this.stompClient != null) {
  //     this.stompClient.disconnect();
  //   }

  //   this.setConnected(false);
  //   console.log('Disconnected!');
  // }

  // sendName() {
  //   this.stompClient.send(
  //     '/gkz/hello',
  //     {},
  //     JSON.stringify({ 'name': this.name })
  //   );
  // }

  // showGreeting(message) {
  //   this.greetings.push(message);
  //   console.log(message)
  // }
}
