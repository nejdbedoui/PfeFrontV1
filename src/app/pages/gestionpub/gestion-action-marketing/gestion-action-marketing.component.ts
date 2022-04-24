import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sector } from '../../../model/Sector';
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
  constructor(private route: Router,) { 
    this.stateOptions = [{label: 'image', value: 'image'}, {label: 'video', value: 'video'}];


 }

  ngOnInit() {
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
