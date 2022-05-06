import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionMarketing } from '../../../model/ActionMarketing';
import { Sector } from '../../../model/Sector';
import { ActionMarketingEndPointServiceService } from '../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { SectorEndPointService } from '../../../service/bp-api-pos/sector-end-point/sector-end-point.service';

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
  ActionsMarketing: ActionMarketing[];
  constructor(private route: Router,private _actionMarketingService:ActionMarketingEndPointServiceService) { 
    this.stateOptions = [{label: 'image', value: 'image'}, {label: 'video', value: 'video'}];


 }

  ngOnInit() {
    this.getAllActionsMarketing();
    
    
  }

  getAllStorage(){
    return this._actionMarketingService.findAllStorage();
  }

  
listeStorages:Storage[];
 getAllActionsMarketing(){
  this.loading = true;
   this._actionMarketingService.findAllActionMarketing().subscribe(async response=>{
     
     if (response.result==1){
     var respon = await this.getAllStorage().toPromise();

       this.ActionsMarketing = response.objectResponse;
       this.ActionsMarketing.forEach(value=>{
         respon.objectResponse.forEach(val=>{
           if (value.idStorage == val.idStorage){
             value.url = val.url;
           }
         })
       });
       this.loading = false;

     }
     else{
  this.loading = false;

     }
     console.log(this.ActionsMarketing)
   });
   
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
