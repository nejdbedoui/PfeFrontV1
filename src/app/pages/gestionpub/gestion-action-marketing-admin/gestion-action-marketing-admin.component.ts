import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionMarketingDTO } from '../../../model/dto/ActionmarketingDTO';
import { ActionMarketingEndPointServiceService } from '../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { GlobalServiceService } from '../../../service/GlobalService/global-service.service';

@Component({
  selector: 'ngx-gestion-action-marketing-admin',
  templateUrl: './gestion-action-marketing-admin.component.html',
  styleUrls: ['./gestion-action-marketing-admin.component.scss']
})
export class GestionActionMarketingAdminComponent implements OnInit {

  affichefilter:boolean=false;
  selectedItem:string;
  stateOptions: any[];
  value1: string = "";
  loading:boolean = false;
  ActionsMarketing: ActionMarketingDTO[];
  ListeCanalDiffusion:any[]=[];
  ListeStatutAction:any[]=[];
  constructor(private route: Router,private _actionMarketingService:ActionMarketingEndPointServiceService,private datePipe: DatePipe,private _GlobalService: GlobalServiceService) { 
    this.stateOptions = [{label: 'image', value: 0}, {label: 'video', value: 1}];

    


 }

  ngOnInit() {
    this.getAllActionsMarketing();
    
   
  }



  getStatusAction(stat:number){
    if(stat==0)
    return "Crée"
    else if(stat==1)
    return "En Attente"
    else if(stat==2)
    return "Confirmé"
    else if(stat==3)
    return "Refusé"
    else if(stat==4)
    return "En Cours"
    else if(stat==5)
    return "Terminée"
  }


  getAllStorage(){
    return this._actionMarketingService.findAllStorage();
  }

  
listeStorages:Storage[];
 getAllActionsMarketing(){
  this.loading = true;
   this._actionMarketingService.findAllActionMarketingDTOWithStatutBiggerThan(0).subscribe(val=>
    {
      console.log(val)
      if(val.result==1){

        
        this.ActionsMarketing=val.objectResponse;
        this.Actions = this.ActionsMarketing;
        this.ActionsMarketing.filter(value=>{
          if (this.ListeCanalDiffusion.indexOf(value.canal) === -1) {
            this.ListeCanalDiffusion.push(value.canal);
        }
        if(this.ListeStatutAction.indexOf(value.statut)===-1){
          this.ListeStatutAction.push(value.statut);
        }
        })
      this.ListeCanalDiffusion.sort();
      this.ListeStatutAction.sort();
        this.loading = false;
      }
    }
    )
   
 }

  uploadedFiles: any[] = [];

  ajouteraction() {
    this.route.navigateByUrl("/pages/gestionpub/gestionactionmarketing/ajouteraction");
  }
  GenerateContrat(action:ActionMarketingDTO){
    this._actionMarketingService.GenerateContrat(action).subscribe(response=>{
      if(response.result == 1){
        console.log(response.objectResponse);
        this._GlobalService.showToast("success", "success", "Action confirmer")
      }
      else {
        this._GlobalService.showToast("danger", "Erreur", response.errorDescription)
      }
    });
  }
  onUpload(event) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
          
      }

      
  }




  //Filter
CanalChoisi:String = 'default';
StatutChoisi:number = -1;
DateCreationChoisi:Date;
  ChoisirCanalDiffusion(event){
    this.CanalChoisi = event;
    this.Filtrer(this.CanalChoisi,this.StatutChoisi,this.DateCreationChoisi);

  }
  ChoisirStatutAction(event){
    this.StatutChoisi = event;
    this.Filtrer(this.CanalChoisi,this.StatutChoisi,this.DateCreationChoisi);
  }

  ChoisirDateCreation(event){
    this.DateCreationChoisi = event;
    console.log(this.DateCreationChoisi)
    this.Filtrer(this.CanalChoisi,this.StatutChoisi,this.DateCreationChoisi);
  }

  Actions:ActionMarketingDTO[];
Filtrer(CanalDiffusion:String,StatutAction:number,DateDebut:Date){

    this.Actions = this.ActionsMarketing;
    if (CanalDiffusion != "default")
      this.Actions = this.Actions.filter(
        item => item.canal == CanalDiffusion
      );

    if (StatutAction != -1)
      this.Actions = this.Actions.filter(
        item => item.statut == StatutAction
      );
      if (DateDebut != null)
      this.Actions = this.Actions.filter(
        item => this.format(new Date(item.dateCreation)) == this.format(DateDebut)
      );

}
format(a) {
  return this.datePipe.transform(a, 'dd/MM/yyyy')
}

clean() {
  this.DateCreationChoisi = null;
  this.CanalChoisi = "default";
  this.StatutChoisi = -1;
  this.Filtrer(this.CanalChoisi,this.StatutChoisi,this.DateCreationChoisi);
}

}
