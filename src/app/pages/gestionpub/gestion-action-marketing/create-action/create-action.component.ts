import { Component, OnInit } from '@angular/core';

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
  constructor() { 
    this.optionCanalDiffusion=[{label: 'Mobile', value: 'mobile'}, {label: 'SMS', value: 'sms'},{label: 'TV', value: 'tv'}];
    this.CanalDiffusion=this.optionCanalDiffusion[0];
    this.optionContenue = [{label: 'image', value: 'image'}, {label: 'video', value: 'video'}];
    this.contenue=this.optionContenue[0];

 }

  ngOnInit() {
  }

  uploadedFiles: any[] = [];


  onUpload(event) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);  
      }
  }
  selectdatedebut(event){
    this.datedebut=event;
    console.log(this.datedebut)
  }
  selectdatefin(event){
    this.datefin=event;
    
    console.log(this.datefin)
  }
  setpopup(){
this.popup=!this.popup;
  }
  setnotif(event){
this.notification=!this.notification;
  }
  setbanner(event){
    this.banner=!this.banner;
  }
}
