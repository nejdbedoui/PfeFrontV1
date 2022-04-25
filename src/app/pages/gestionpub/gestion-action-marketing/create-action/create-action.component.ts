import { Component, OnInit } from '@angular/core';
import { ActionMarketing } from '../../../../model/ActionMarketing';
import { CategoriePub } from '../../../../model/CategoriePub';
import { Sector } from '../../../../model/Sector';
import { ActionMarketingEndPointServiceService } from '../../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { CategoriePubEndPointServiceService } from '../../../../service/bp-api-action-marketing/categorie-pub-end-point/categorie-pub-end-point-service.service';
import { SectorEndPointService } from '../../../../service/bp-api-pos/sector-end-point/sector-end-point.service';

@Component({
  selector: 'ngx-create-action',
  templateUrl: './create-action.component.html',
  styleUrls: ['./create-action.component.scss']
})
export class CreateActionComponent implements OnInit {

  sector: string;
  optionContenue: any[];
  optionCanalDiffusion: any[];
  contenue: string = "";
  CanalDiffusion: string = "";
  datedebut: Date;
  datefin: Date;
  banner: boolean = false;
  popup: boolean = false;
  notification: boolean = false;
  sectors: Sector[];
  action: ActionMarketing;
  categorie: CategoriePub;
  lien:String;
  description:String;
  smsbody:String;
  id: string = localStorage.getItem("UserId")
  constructor(private _SectorService: SectorEndPointService, private _Actionmarketingendpointservice: ActionMarketingEndPointServiceService, private _Categoriepubendpointservice: CategoriePubEndPointServiceService) {
    this.optionCanalDiffusion = [{ label: 'Mobile', value: 'mobile' }, { label: 'SMS', value: 'sms' }, { label: 'TV', value: 'tv' }];
    this.CanalDiffusion = this.optionCanalDiffusion[0];
    this.optionContenue = [{ label: 'image', value: 'image' }, { label: 'video', value: 'video' }];
    this.contenue = this.optionContenue[0];

  }

  ngOnInit() {

    this.getAllSectors();
  }

  uploadedFiles: any[] = [];

  getAllSectors() {
    this._SectorService.findAllSectorByFActif(1).subscribe(response => {
      if (response.result == 1) {
        this.sectors = response.objectResponse;

      }
    });
  }
  submit() {
    this.categorie=new CategoriePub();
    this.categorie.libelle=this.sector;// hedhi badelha c bon base 3abitha 
    this.action = new ActionMarketing();
    console.log(this.categorie)
    this._Categoriepubendpointservice.CreateCategoriePub(this.categorie).subscribe(val=>{
      this.action.idCategorie=val.objectResponse.idCategorie
      this.action.url=this.lien;
      this.action.description=this.description;
      this.action.dateDebut=this.datedebut;
      this.action.dateFin=this.datefin;
      this.action.dateCreation=new Date();
      if(this.CanalDiffusion==this.optionCanalDiffusion[1]){
        this.action.smsBody=this.smsbody;
        this.ajouteraction(this.action);
      }else if(this.CanalDiffusion==this.optionCanalDiffusion[0]){
        let canal="";
        if(this.banner)
          canal=canal+"bannier";
        
        if(this.popup)
          canal=canal+",popup";
        
        if(this.notification)
        canal=canal+",notification";
        this.action.libelleCanalDiffusion=canal;
        if(this.contenue==this.optionContenue[0])
        this.action.typeAffichageMobile="image"
        else
        this.action.typeAffichageMobile="video"
        this.ajouteraction(this.action);
      }else{

      this.ajouteraction(this.action);
      }
      
    }
     
      
      )

   
  }



  ajouteraction(action:ActionMarketing){
    console.log(action);
    this._Actionmarketingendpointservice.CreateActionMarketing(action).subscribe(val =>
      console.log(val)
    ) 
  }
  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log(event);
    }
  }
  selectdatedebut(event) {
    this.datedebut = event;
  }
  selectdatefin(event) {
    this.datefin = event;
  }
  setpopup() {
    this.popup = !this.popup;
  }
  setnotif() {
    this.notification = !this.notification;
  }
  setbanner() {
    this.banner = !this.banner;
  }
}
