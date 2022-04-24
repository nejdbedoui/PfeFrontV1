import { Component, OnInit } from '@angular/core';
import { Sector } from '../../../../model/Sector';
import { SectorEndPointService } from '../../../../service/bp-api-pos/sector-end-point/sector-end-point.service';

@Component({
  selector: 'ngx-create-action',
  templateUrl: './create-action.component.html',
  styleUrls: ['./create-action.component.scss']
})
export class CreateActionComponent implements OnInit {

  categorie:string;
  optionContenue: any[];
  optionCanalDiffusion: any[];
  contenue: string = "";
  CanalDiffusion: string = "";
  datedebut:Date;
  datefin:Date;
  banner:boolean=false;
  popup:boolean=false;
  notification:boolean=false;

  sector:Sector[];


  constructor(private _SectorService: SectorEndPointService) { 
    this.optionCanalDiffusion=[{label: 'Mobile', value: 'mobile'}, {label: 'SMS', value: 'sms'},{label: 'TV', value: 'tv'}];
    this.CanalDiffusion=this.optionCanalDiffusion[0];
    this.optionContenue = [{label: 'image', value: 'image'}, {label: 'video', value: 'video'}];
    this.contenue=this.optionContenue[0];

 }

  ngOnInit() {

    this.getAllSectors();
  }

  uploadedFiles: any[] = [];

  getAllSectors(){
    this._SectorService.findAllSectorByFActif(1).subscribe(response=>{
      if (response.result==1){
        this.sectors = response.objectResponse;
        console.log(response);
      }
    });
  }

  onUpload(event) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);  
          console.log(event) ;
      }
  }
  selectdatedebut(event){
    this.datedebut=event;
  }
  selectdatefin(event){
    this.datefin=event;
  }
  setpopup(){
this.popup=!this.popup;
  }
  setnotif(){
this.notification=!this.notification;
  }
  setbanner(){
    this.banner=!this.banner;
  }
}
