import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActionMarketing } from '../../../../model/ActionMarketing';
import { CategoriePub } from '../../../../model/CategoriePub';
import { PopulationCible } from '../../../../model/PopulationCible';
import { Sector } from '../../../../model/Sector';
import { ActionMarketingEndPointServiceService } from '../../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { CategoriePubEndPointServiceService } from '../../../../service/bp-api-action-marketing/categorie-pub-end-point/categorie-pub-end-point-service.service';
import { PopulationCibleEndPointServiceService } from '../../../../service/bp-api-action-marketing/population-cible-end-point/population-cible-end-point-service.service';
import { SectorEndPointService } from '../../../../service/bp-api-pos/sector-end-point/sector-end-point.service';

@Component({
  selector: 'ngx-create-action',
  templateUrl: './create-action.component.html',
  styleUrls: ['./create-action.component.scss']
})

@Injectable()
export class CreateActionComponent implements OnInit {
  @ViewChild('videoPlayer',{static: false}) videoPlayer: ElementRef;

  
  ActionFormstep1:FormGroup;
  ActionFormstep2:FormGroup;

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
  sectors: CategoriePub[];
  action: ActionMarketing;
  categorie: CategoriePub;
  lien:String;
  description:String;
  smsbody:String;
  uploadedFiles: any[] = [];
  populationCible:PopulationCible;
  id: string = localStorage.getItem("UserId");
  fileInfos: Storage;
  image1:any
  image2:any


  constructor(private _FormBuilder:FormBuilder, private _populationCibleService:PopulationCibleEndPointServiceService, private _Actionmarketingendpointservice: ActionMarketingEndPointServiceService, private _Categoriepubendpointservice: CategoriePubEndPointServiceService) {

    this.optionCanalDiffusion = [{ label: 'Mobile', value: 'mobile' }, { label: 'SMS', value: 'sms' }, { label: 'TV', value: 'tv' }];
    this.optionContenue = [{ label: 'image', value: 'image' }, { label: 'video', value: 'video' }];
    this.contenue = this.optionContenue[0];
    
     
     
  }

 

  ngOnInit() {
    this.getAllSectors();
     this.getfile();
  
//
}
getfile(){
  this._Actionmarketingendpointservice.findfileByid("626c1aeb0f1eac1778610aba").subscribe( val=>
    {  
      console.log(val.objectResponse);
    this.image1='data:image/png;base64,' +val.objectResponse.imagedata
  
  }
      
    );
    this._Actionmarketingendpointservice.findfileByid("626c1a7a0f1eac1778610ab9").subscribe( val=>
      {  
        console.log(val.objectResponse);
      this.image2='data:video/mp4;base64,'+val.objectResponse.imagedata
      var video = document.createElement('video');
      document.body.appendChild(video);
      video.src = this.image2;
    }
        
      );
}
public getImage(): Observable<string> {
  return Observable.create(this.image1);
}

onUpload(event) {
  console.log("nejd") 
}
checks = [
  {Libelle : "Pop Up",value:0},
  {Libelle : "Notification",value:0},
  {Libelle : "Banner",value:0}
];
  InstanciateForm(){
    this.ActionFormstep1 = this._FormBuilder.group({
      SecteurActivite:[null,[]],
      CanalDiffusion:[[],[]],
      
      dateDebutPub:[null,[]],
      dateFinPub:[null,[]],
    })
    
    this.ActionFormstep2=this._FormBuilder.group({
      LienPub:['',[]],
      Description:['',[]],
      myChoices: [new FormArray([]),[]],
      Atatchement:[null,[]],
      SMSBody:['',[]],
      TypeContenue:[null,[]]
    })
    
    
    ;
    this.ActionFormstep1.get('CanalDiffusion').setValidators(null);
    this.ActionFormstep1.get('CanalDiffusion').valueChanges
  .subscribe(value => {
    console.log(value);
    if(value.value == 'sms') {
      this.ActionFormstep1.get('SMSBody').setValidators(null);
      this.ActionFormstep1.get('TypeContenue').setValidators(null);
      this.ActionFormstep1.get('myChoices').setValidators(null);
    } else {
      this.ActionFormstep1.get('SMSBody').setValidators(null);
      this.ActionFormstep1.get('TypeContenue').setValidators(null);
      this.ActionFormstep1.get('myChoices').setValidators(null);
    }
  });
  }

  get formControls() { return this.ActionFormstep1.controls; }

  onCheckChange(event:any,index:number) {
    const formArray: FormArray = this.ActionFormstep1.get('myChoices') as FormArray;
  
    

    /* Selected */
    if(event.target.checked){
     
      // Add a new control in the arrayForm
      if(index==0)
      formArray.push(new FormControl(0));
      else if(index==1)
        formArray.push(new FormControl(1));
        else if(index==2)
        formArray.push(new FormControl(2));
      
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == index) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }
  isSubmitted:boolean = false;
  test(){
    this.isSubmitted=!this.isSubmitted;
    console.log(this.ActionFormstep1)
    console.log(this.ActionFormstep1.value.SMSBody)
  }
  tests(event){
    console.log(event)
  }

 

  getAllSectors() {
    this._Categoriepubendpointservice.findAllCategoriePub().subscribe(response => {
      if (response.result == 1) {
        this.sectors = response.objectResponse;

      }
    });
  }


 CreatePopulationCible(populationCible:PopulationCible){
  return this._populationCibleService.CreatePopulationCible(populationCible);
}
  async submit() {
    this.categorie=new CategoriePub();
    this.categorie.libelle=this.sector;
    this.action = new ActionMarketing();
    var response =await this.CreatePopulationCible(this.populationCible).toPromise();
    if(response.result==1){
      this.action.idPopulationCible=response.objectResponse.idPopulationCible;
    }
    
    console.log(this.categorie)

      this.action.idCategorie=this.sector;
      this.action.url=this.lien;
      this.action.idPartenaire=this.id;
      this.action.urlContenue=["https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg"];
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



  ajouteraction(action:ActionMarketing){
    console.log(action);
    this._Actionmarketingendpointservice.CreateActionMarketing(action).subscribe(val =>
      console.log(val)
    ) 
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
