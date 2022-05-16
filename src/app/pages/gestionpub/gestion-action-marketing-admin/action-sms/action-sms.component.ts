import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionMarketingDTO } from '../../../../model/dto/ActionmarketingDTO';
import { ActionMarketingEndPointServiceService } from '../../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { CanalDiffusionEndPointService } from '../../../../service/bp-api-action-marketing/canal-diffusion-end-point/canal-diffusion-end-point.service';
import { GlobalServiceService } from '../../../../service/GlobalService/global-service.service';

@Component({
  selector: 'ngx-action-sms',
  templateUrl: './action-sms.component.html',
  styleUrls: ['./action-sms.component.scss']
})
export class ActionSmsComponent implements OnInit {

  affichefilter:boolean=false;
  selectedItem:string;
  stateOptions: any[];
  value1: string = "";
  loading:boolean = false;
  ActionsMarketing: ActionMarketingDTO[];
  constructor(private route: Router,private _actionMarketingService:ActionMarketingEndPointServiceService,private _GlobalService: GlobalServiceService,private _canalDiffusionService:CanalDiffusionEndPointService) { 
    this.stateOptions = [{label: 'image', value: 0}, {label: 'video', value: 1}];


 }

  ngOnInit() {
    this.getCanal();
    
   
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

  getCanal(){
    this._canalDiffusionService.findCanalByLibelle("SMS").subscribe(response=>{
      if (response.result==1){
        this.getAllActionsMarketing(response.objectResponse.idCanaldiffusion);
      }
    });
  }
listeStorages:Storage[];
 getAllActionsMarketing(idCanal:String){
  this.loading = true;
   this._actionMarketingService.findAllActionMarketingByCanalDTO(idCanal).subscribe(val=>
    {
      if(val.result==1){
        this.ActionsMarketing=val.objectResponse;
        console.log(this.ActionsMarketing)
        this.loading = false;
      }
    }
    )
   
 }

  uploadedFiles: any[] = [];

 

  GenerateContrat(action:ActionMarketingDTO){
    this._actionMarketingService.GenerateContrat(action).subscribe(response=>{
      if(response.result == 1){
        console.log(response.objectResponse);
        this._GlobalService.showToast("success", "success", "Contrat générer avec succès")
      }
      else {
        this._GlobalService.showToast("danger", "Erreur", response.errorDescription)
      }
    });
  }
  
}


