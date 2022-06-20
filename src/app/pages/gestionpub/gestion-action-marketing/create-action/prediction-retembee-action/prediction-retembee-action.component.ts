import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { forkJoin } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { VisitorsAnalyticsData, OutlineData } from '../../../../../@core/data/visitors-analytics';
import { LayoutService } from '../../../../../@core/utils';
import { SystemePredictionServiceService } from '../../../../../service/bp-api-action-marketing/systeme-prediction-end-point/systeme-prediction-service.service';
import { ngxcard } from '../../../dashboard-principale/dashboard-principale.component';

@Component({
  selector: 'ngx-prediction-retembee-action',
  templateUrl: './prediction-retembee-action.component.html',
  styleUrls: ['./prediction-retembee-action.component.scss']
})
export class PredictionRetembeeActionComponent implements OnInit {
  visitorsAnalyticsData: { innerLine: number[]; outerLine: OutlineData[]; };

  constructor(private _predictionService:SystemePredictionServiceService,private themeService: NbThemeService,
    private visitorsAnalyticsChartService: VisitorsAnalyticsData,private layoutService: LayoutService) { 
      

    // forkJoin(
    //   this.visitorsAnalyticsChartService.getInnerLineChartData(),
    //   this.visitorsAnalyticsChartService.getOutlineLineChartData(),
    //   this.visitorsAnalyticsChartService.getPieChartData(),
    // )
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe(([innerLine, outerLine, pieChartValue]: [number[], OutlineData[], number]) => {
    //     this.visitorsAnalyticsData = {
    //       innerLine: innerLine,
    //       outerLine: outerLine,
    //     };

    //     this.pieChartValue = pieChartValue;
    //   });
    this.prediction= {
      "agemin":16,
      "agemax":54,
      "dateDebut":new Date(2022,5,4),
      "dateFin":new Date(2022,5,12),
      "secteur":0,
      "sexe":2
  };
  }
  
loading:boolean;
  ngOnInit() {
    this.predict();
   this.getNombreJour();
  }
  getWeeks() {
    return [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ];
  }

  single: ngxcard[]=[
    {
      "name":"Nombre de vue totale possible",
      "value":0
    },
    {
      "name":"Nombre de clique totale possible",
      "value":0
    },
  ];


  view: any[] = [300,400];

  colorScheme = {
    domain: ['#3366ff', '#00d68f', '#7366b2', '#333333', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#f0f4f4';
  prediction:any

listeVue:any[] = [];
listeClique:any[]=[];
daysOfWeek:number[]=[];
chartload:boolean;
getNombreJour(){
  let dateDeb = new Date(this.prediction["dateDebut"]);
  let dateF = new Date (this.prediction["dateFin"]);
   while (dateDeb <= dateF) {
     this.daysOfWeek.push(dateDeb.getDay());
     dateDeb.setDate(dateDeb.getDate() + 1);
   }
  
}
totalVue=0;
totalClique=0;
listepredvuewithdate:PredVueAvecDate[] = [];
listepredcliquewithdate:PredCliqueAvecDate[] = [];

  predict(){

    
    const countOccurrences = (arr, val,rep) => arr.reduce((a, v) => (v === val ? a + 1 : a), rep);
    this.loading = true;
let dateD = new Date(this.prediction["dateDebut"]);
this._predictionService.Predict(this.prediction).subscribe(response=>{
let predicition = JSON.parse(response)["Predictions"];
  predicition.forEach(value=>{
    this.listepredvuewithdate.push({"nbreVue":value[0][0],"day":dateD.getDay()})
    this.listeVue.push(Math.round(value[0][0]))
    this.listepredcliquewithdate.push({"nbreClique":value[0][1],"day":dateD.getDay()})
    dateD.setDate(dateD.getDate() + 1);
  })
console.log(this.listepredcliquewithdate)
  this.listepredvuewithdate.forEach(value=>{
    this.totalVue+=(value.nbreVue * countOccurrences(this.daysOfWeek,value.day,0));
  })
  this.single[0].value=Math.round(this.totalVue);
  
  this.listepredcliquewithdate.forEach(value=>{
    this.totalClique+=(value.nbreClique * countOccurrences(this.daysOfWeek,value.day,0));
  })
  this.getChartData();
  this.single[1].value=Math.round(this.totalClique);
  
  this.loading = false;
})



  }

  getChartData(){
    this.chartload = true;
let outerLine: OutlineData[] = [];
  this.listepredcliquewithdate.forEach(value=>{
    outerLine.push({"label":this.getWeeks()[value.day],"value":Math.round(value.nbreClique)})
  })
  this.visitorsAnalyticsData = {
         innerLine: this.listeVue,
         outerLine: outerLine,
         };
  this.pieChartValue = (this.totalClique/this.totalVue)*100;


  this.chartload=false
  }

  private alive = true;

  pieChartValue: number;



  ngOnDestroy() {
    this.alive = false;
  }



}
export class PredVueAvecDate{
  nbreVue:number;
  day:number;
}
export class PredCliqueAvecDate{
  nbreClique:number;
  day:number;
}

