import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionMarketing } from '../../../model/ActionMarketing';
import { ActionMarketingDTO } from '../../../model/dto/ActionmarketingDTO';
import { ActionMarketingEndPointServiceService } from '../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';

@Component({
  selector: 'ngx-gestion-action-marketing',
  templateUrl: './gestion-action-marketing.component.html',
  styleUrls: ['./gestion-action-marketing.component.scss']
})
export class GestionActionMarketingComponent implements OnInit {
  affichefilter:boolean=false;
  selectedItem:string;
  stateOptions: any[];
  value1: string = "";
  loading:boolean = false;
  ActionsMarketing: ActionMarketingDTO[];
  id: string = localStorage.getItem("partenaireid");
  image:string="image";
  video:string="video";
  constructor(private route: Router,private _actionMarketingService:ActionMarketingEndPointServiceService) { 
    this.stateOptions = [{label: 'image', value: 0}, {label: 'video', value: 1}];


 }

  ngOnInit() {
    console.log(this.id);
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
   this._actionMarketingService.findAllActionMarketingDTOByIdPartenaire(this.id).subscribe(val=>
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
  onUpload(event) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
          
      }

      
  }

}
