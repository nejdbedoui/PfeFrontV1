import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { ActivityAction, UserActivityData } from '../../../@core/data/user-activity';
import { ActionEnCoursDeDiffusionDTO } from '../../../model/dto/ActionEnCoursDeDiffusionDTO';
import { DemandeDiffusionDTO } from '../../../model/dto/DemandeDiffusionDTO';
import { DashboardGeneraleEndPointServiceService } from '../../../service/bp-api-action-marketing/dashboard-generale-end-point/dashboard-generale-end-point-service.service';

@Component({
  selector: 'ngx-dashboard-principale',
  templateUrl: './dashboard-principale.component.html',
  styleUrls: ['./dashboard-principale.component.scss']
})
export class DashboardPrincipaleComponent implements OnInit {

  loading: boolean;
  idPartenaire: string = localStorage.getItem("partenaire2");

  ngOnInit() {
    this.getAllDemandeActionsMarketing(this.idPartenaire);
    this.getAllDemandeDiffusion(this.idPartenaire);
  }
actionEncours:ActionEnCoursDeDiffusionDTO[];
demandesDiffusions:DemandeDiffusionDTO[];
  currentTheme: string;

  constructor(private themeService: NbThemeService,
    private userActivityService: UserActivityData,private _dashboardGeneraleService : DashboardGeneraleEndPointServiceService) {
        this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });

    this.getUserActivity('week');



  }

  GererDemande(demande:DemandeDiffusionDTO){
  }

  getAllDemandeActionsMarketing(idPartenaire:String){
    this.loading = true;
     this._dashboardGeneraleService.findAllActionEnCourDeDiffusionByIdPartenaire(idPartenaire).subscribe(response=>
      {
        console.log(response)
        if(response.result==1){
          this.actionEncours=response.objectResponse;
          
          this.loading = false;
        }
      }
      )
     
   }
   getAllDemandeDiffusion(idPartenaire:String){
    this.loading = true;
     this._dashboardGeneraleService.findAllDemandeDiffusionDTOByIdPartenaire(idPartenaire).subscribe(response=>
      {
        console.log(response)
        if(response.result==1){
          this.demandesDiffusions=response.objectResponse;
          
          this.loading = false;
        }
      }
      )
     
   }


  single: ngxcard[]=[
    {
      "name":"Demandes en attente",
      "value":10
    },
    {
      "name":"Total des revenus en TND",
      "value":100
    },
    {
      "name":"Revenue potentiel en TND",
      "value":27
    },
    {
      "name":"Age Maximum Cliqué",
      "value":54
    },
  ];


  view: any[] = [300,400];

  colorScheme = {
    domain: ['#3366ff', '#00d68f', '#7366b2', '#333333', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#f0f4f4';
  
 

  private alive = true;

  userActivity: ActivityAction[] = [];
  type = 'All';
  types = ['All','Cliques', 'Vue'];



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
export class ngxcard{
  name:String;
  value:number;
}
