import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { ActivityAction, UserActivityData } from '../../../@core/data/user-activity';
import { ActionEnCoursDeDiffusionDTO } from '../../../model/dto/ActionEnCoursDeDiffusionDTO';
import { DemandeDiffusionDTO } from '../../../model/dto/DemandeDiffusionDTO';
import { DashboardGeneraleEndPointServiceService } from '../../../service/bp-api-action-marketing/dashboard-generale-end-point/dashboard-generale-end-point-service.service';
import { ParametreActionEndPointServiceService } from '../../../service/bp-api-action-marketing/parametre-action-end-point/parametre-action-end-point-service.service';

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
    console.log(this.idPartenaire)
  }
actionEncours:ActionEnCoursDeDiffusionDTO[] = [];
demandesDiffusions:DemandeDiffusionDTO[] = [];
  currentTheme: string;

  constructor(private themeService: NbThemeService,
  private _dashboardGeneraleService : DashboardGeneraleEndPointServiceService,private _parametreservice:ParametreActionEndPointServiceService) {
        this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });




  }

  GererDemande(demande:DemandeDiffusionDTO,statut:number){
    console.log(demande)
    this._parametreservice.findByiIdParametreActionMarketing(demande.idParametreActionMarketing).subscribe(response=>{
      if (response.result==1){
        console.log(response)
        let parametre = response.objectResponse;
        parametre.statut=statut;
        this._parametreservice.updateParametre(parametre).subscribe(value=>{
          if(value.result==1){
          console.log(value)
          
          }
        })
      }
    })
  }

  getAllDemandeActionsMarketing(idPartenaire:String){
    this.loading = true;
     this._dashboardGeneraleService.findAllActionEnCourDeDiffusionByIdPartenaire(idPartenaire).subscribe(response=>
      {
        if(response.result==1){
          this.actionEncours=response.objectResponse;
          
          this.loading = false;
        }
      }
      )
     
   }
   getAllDemandeDiffusion(idPartenaire:String){
    this.loading = true;
     this._dashboardGeneraleService.findAllDemandeDiffusionDTOByIdPartenaire(idPartenaire).subscribe(async response=>
      {
        console.log(response)
        if(response.result==1){
          this.demandesDiffusions=response.objectResponse;
         let res = await this._dashboardGeneraleService.findTotalRevenueAndNombreDemandeEnCour(this.idPartenaire).toPromise();
          this.single[0].value = this.demandesDiffusions.length;
          this.single[2].value = this.demandesDiffusions.reduce((accumulator, obj)=>{
           return accumulator+obj.prix;
          },0);
          this.single[1].value=res.objectResponse.totalRevenueDesDemandes;
          this.single[3].value=res.objectResponse.demandeEncoursDeDiffusion;
          this.loading = false;
        }
      }
      )
     
   }

   //if (this.ListeCanalDiffusion.indexOf(value.canal) === -1) {
    //this.ListeCanalDiffusion.push(value.canal);
  //}
   numberCard:ngxcard[];



  single: ngxcard[]=[
    {
      "name":"Demandes en attente",
      "value":0
    },
    {
      "name":"Total des revenus en TND",
      "value":0
    },
    {
      "name":"Revenue potentiel en TND",
      "value":0
    },
    {
      "name":"Nombre des demandes diffusantes",
      "value":0
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



  

  ngOnDestroy() {
    this.alive = false;
  }
}
export class ngxcard{
  name:String;
  value:number;
}
