import { Component, OnInit, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { OrdersChart } from '../../../@core/data/orders-chart';
import { OrderProfitChartSummary, OrdersProfitChartData } from '../../../@core/data/orders-profit-chart';
import { ProfitChart } from '../../../@core/data/profit-chart';
import { VisitorsAnalyticsData } from '../../../@core/data/visitors-analytics';
import { OrdersChartComponent } from '../../e-commerce/charts-panel/charts/orders-chart.component';
import { ProfitChartComponent } from '../../e-commerce/charts-panel/charts/profit-chart.component';
import { ActivityAction, UserActivityData } from '../../../@core/data/user-activity';
import { HistoriqueInteractionEndPointServiceService } from '../../../service/bp-api-action-marketing/historique-interaction-end-point/historique-interaction-end-point-service.service';
import { HistoriqueInteractionAction } from '../../../model/HistoriqueInteractionAction';
import { ActivatedRoute } from '@angular/router';
import { OneHistoriqueInteractionActionResponse } from '../../../model/response/OneHistoriqueInteractionActionResponse';
import { DetailsActionService } from '../../../service/bp-api-action-marketing/details-action-dto-end-point/details-action.service';
import { ActionMarketingEndPointServiceService } from '../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { ActionMarketing } from '../../../model/ActionMarketing';
import { DetailsActionDTO } from '../../../model/dto/DetailsActionDTO';


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

  @ViewChild('ordersChart', { static: true }) ordersChart: OrdersChartComponent;
  @ViewChild('profitChart', { static: true }) profitChart: ProfitChartComponent;
action:ActionMarketing;
details:DetailsActionDTO;
  ngOnInit(): void {
    
    this.idActionMarketing=this.route.snapshot.paramMap.get('id');

    
    this._actionMarketingService.findByidActionMarketing(this.idActionMarketing).subscribe(val1 => {
      if (val1.result == 1) {
        console.log(this.details)

        this.action = val1.objectResponse
        this._DetailsactiondtoService.findDetailsByAction(this.action).subscribe(result=>{
          if(result.result==1){
            this.details=result.objectResponse;
            console.log(this.details)
          }
         
        })
      }
    });

    this.getHistoriqueData(this.idActionMarketing);
    this.connect();
  }

idActionMarketing:String;
historiquesInteractions:HistoriqueInteractionAction[];
  constructor(private _actionMarketingService: ActionMarketingEndPointServiceService,private _DetailsactiondtoService:DetailsActionService,private route: ActivatedRoute,private ordersProfitChartService: OrdersProfitChartData,private visitorsAnalyticsChartService: VisitorsAnalyticsData,private userActivityService: UserActivityData,private _historiqueService:HistoriqueInteractionEndPointServiceService) {
   

    this.getUserActivity('week');




  }

  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

   
  }
  loading:boolean;
  label:string[]=[];
  nombreClique=0;
  nombreVue=0;
  agemin=100;
  agemax = 0;
  cliqueparheure:number[]=[]
  vueparheure:number[]=[]
  getHistoriqueData(idActionMarketing){
    this.loading = true;
    this._historiqueService.findAllHistorique(idActionMarketing).subscribe(response=>
     {
      
      for (let i = 0; i < 24; i++) {
        this.label.push(i.toString());
        this.cliqueparheure.push(0);
        this.vueparheure.push(0);
        
      }
    if(response.result==1){
      this.historiquesInteractions = response.objectResponse;
      this.historiquesInteractions.forEach(value=>{
        if(this.agemin>value.age)
        this.agemin=value.age;
        if(this.agemax<value.age)
        this.agemax = value.age;
       if(value.action==1){
        this.nombreClique+=1;
       }
       else{
        this.nombreVue+=1;
       }
      })
const today = new Date();
      this.historiquesInteractions.forEach(value=>{
        for (let i = 0; i < 24; i++) {
          if(new Date(value.date).getDate()==today.getDate()){
            if(value.action==0 && new Date(value.date).getHours()==i)
            this.vueparheure[i]+=1;
            if(value.action==1 && new Date(value.date).getHours()==i)
              this.cliqueparheure[i]+=1;
            
          }
          
        }
      })
      
      
      
      this.loading = false;
    }
    this.getOrdersChartData();

    this.single[0].value = this.nombreVue;
    this.single[1].value = this.nombreClique;
    this.single[2].value = this.agemin;
    this.single[3].value = this.agemax;
    console.log(this.vueparheure)
    console.log(this.cliqueparheure)
    this.loading = false;
    
     }
     

     )
     

  }
  userActivity: ActivityAction[] = [];

  getUserActivity(period: string) {
    this.userActivityService.getUserActivityData('week')
      .pipe(takeWhile(() => this.alive))
      .subscribe(userActivityData => {
        this.userActivity = userActivityData;
      });
  }
  show:boolean = false;
  sendSMS(){
    this._DetailsactiondtoService.sendsms(this.action.smsBody).subscribe();

  }
  changerstatut(){
    this.show = true;
  }
  


  getOrdersChartData() {
    this.ordersChartData = {
      chartLabel: this.label,
      linesData: [
        this.vueparheure,
        this.cliqueparheure
      ],
    };
  }



  ngOnDestroy() {
    this.alive = false;
  }

  single: any[]=[
    {
      "name":"Vues Totale",
      "value":0
    },
    {
      "name":"Cliques Totale",
      "value":0
    },
    {
      "name":"Age Minimum Cliqué",
      "value":0
    },
    {
      "name":"Age Maximum Cliqué",
      "value":0
    },
  ];
  view: any[] = [300,500];

  colorScheme = {
    domain: ['#3366ff', '#00d68f', '#7366b2', '#333333', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#f0f4f4';
  
 


 







//Real time




  // title = 'grokonez';
  // description = 'Angular-WebSocket Demo';

  greetings: string[] = [];
  disabled = true;
  name: string;
  private stompClient = null;

  // constructor() { }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }
  

  connect() {
    const socket = new SockJS('http://localhost:8080/historique-stomp-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);
      _this.sendAction() 
      _this.stompClient.subscribe('/HistoriqueInteraction/sendHistorique', function (historique) {
       let historique1:HistoriqueInteractionAction =  JSON.parse(historique.body).objectResponse;
      _this.historiquesInteractions.push(historique1)
      if(historique1.age>_this.agemax)
      _this.agemax=historique1.age;
      _this.single[3].value= _this.agemax;
      _this.single = [..._this.single]
      if(historique1.age<_this.agemin)
      _this.agemin=historique1.age;
      _this.single[2].value= _this.agemin;
      _this.single = [..._this.single]
      if(historique1.action==0){
      _this.nombreVue+=1;
      _this.single[0].value=_this.nombreVue;
      _this.single = [..._this.single]
      _this.vueparheure[new Date(historique1.date).getHours()]+=1;
      _this.getOrdersChartData();
      }
      else{
        _this.nombreClique+=1.
        _this.single[1].value=_this.nombreClique;
        _this.single = [..._this.single]
        console.log(_this.nombreClique)
        _this.cliqueparheure[new Date(historique1.date).getHours()]+=1;
        _this.getOrdersChartData();
      }
      
      
      });
    });
  }

  // disconnect() {
  //   if (this.stompClient != null) {
  //     this.stompClient.disconnect();
  //   }

  //   this.setConnected(false);
  //   console.log('Disconnected!');
  // }

  sendAction() {
    this.stompClient.send(
      '/v1/startwebsocket',
      {},
      this.idActionMarketing
    );
  }

  showGreeting(message) {
    this.greetings.push(message);
    console.log(message)
  }
}
export class listecliquewithhour{
  
}