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
  constructor(private route: Router,private _actionMarketingService:ActionMarketingEndPointServiceService,private _GlobalService: GlobalServiceService) { 
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
      if(val.result==1){
        this.ActionsMarketing=val.objectResponse;
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


}
