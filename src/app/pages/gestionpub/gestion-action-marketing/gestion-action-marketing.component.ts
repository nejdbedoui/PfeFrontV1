import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-gestion-action-marketing',
  templateUrl: './gestion-action-marketing.component.html',
  styleUrls: ['./gestion-action-marketing.component.scss']
})
export class GestionActionMarketingComponent implements OnInit {
  selectedItem:string;
  stateOptions: any[];
  value1: string = "";
  constructor() { 
    this.stateOptions = [{label: 'image', value: 'image'}, {label: 'video', value: 'video'}];


 }

  ngOnInit() {
  }

  uploadedFiles: any[] = [];


  onUpload(event) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
          
      }

      
  }

}
