import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { NbThemeService } from '@nebular/theme';
import { forkJoin } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { OutlineData, VisitorsAnalyticsData } from '../../../@core/data/visitors-analytics';

@Component({
  selector: 'ngx-dashboard-real-time',
  templateUrl: './dashboard-real-time.component.html',
  styleUrls: ['./dashboard-real-time.component.scss']
})
export class DashboardRealTimeComponent implements OnInit {
  ngOnInit(): void {
    
  }




  constructor() {
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
