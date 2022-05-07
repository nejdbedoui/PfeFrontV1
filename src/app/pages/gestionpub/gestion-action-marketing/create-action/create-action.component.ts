import { Component, Injectable, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionMarketing } from '../../../../model/ActionMarketing';
import { PopulationCible } from '../../../../model/PopulationCible';
import { ActionMarketingEndPointServiceService } from '../../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { CategoriePubEndPointServiceService } from '../../../../service/bp-api-action-marketing/categorie-pub-end-point/categorie-pub-end-point-service.service';
import { PopulationCibleEndPointServiceService } from '../../../../service/bp-api-action-marketing/population-cible-end-point/population-cible-end-point-service.service';
import * as _ from 'lodash';
import { GlobalServiceService } from '../../../../service/GlobalService/global-service.service';
import { PartenaireBpriceEndPointService } from '../../../../service/bp-api-pos/partenaire-bprice-end-point/partenaire-bprice-end-point.service';
import { PartenaireBprice } from '../../../../model/PartenaireBprice';
import { Sector } from '../../../../model/Sector';
@Component({
  selector: 'ngx-create-action',
  templateUrl: './create-action.component.html',
  styleUrls: ['./create-action.component.scss']
})

@Injectable()
export class CreateActionComponent implements OnInit {

  isSubmitted: boolean = false;
  ActionForm: FormGroup;
  sector: string;
  optionContenue: any[];
  optionaffichage: any[];
  optionCanalDiffusion: any[];
  banner: boolean = false;
  popup: boolean = false;
  notification: boolean = false;
  sectors: Sector[];
  action: ActionMarketing;
  uploadedFiles: any[] = [];
  populationCible: PopulationCible;
  id: string = localStorage.getItem("partenaireid");
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
file:any;
partenaire:PartenaireBprice;
checks = [
  { Libelle: "Pop Up", value: 0 },
  { Libelle: "Notification", value: 0 },
  { Libelle: "Banner", value: 0 }
];

  constructor(private _Partenaire:PartenaireBpriceEndPointService,private _GlobalService: GlobalServiceService,private _FormBuilder: FormBuilder, private _populationCibleService: PopulationCibleEndPointServiceService, private _Actionmarketingendpointservice: ActionMarketingEndPointServiceService, private _Categoriepubendpointservice: CategoriePubEndPointServiceService) {
    this.optionCanalDiffusion = [{ label: 'Mobile', value: 0 }, { label: 'SMS', value: 1 }, { label: 'TV', value: 2 }];
    this.optionContenue = [{ label: 'Image', value: 0 }, { label: 'Video', value: 1 }];
    this.optionaffichage = [{ label: 'Pop Up', value: 0 }, { label: 'Bannier', value: 1 },{ label: 'Notification', value: 2 }];
  }



  ngOnInit() {
    this._Partenaire.findByIdPartenaire(this.id).subscribe(val=>
      {
        this.getAllSectors(val.objectResponse.idSector);
      }
      )
    
    this.InstanciateForm(); 
  }


 
  InstanciateForm() {
    this.ActionForm = this._FormBuilder.group({
      SecteurActivite: [null, [Validators.required]],
      CanalDiffusion: [[], [Validators.required]],
      LienPub: ['', [Validators.required]],
      titre: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      dateDebutPub: [null, [Validators.required]],
      dateFinPub: [null, [Validators.required]],
      myChoices: [new FormArray([]), []],
      SMSBody: ['', []],
      TypeContenue: [null, []],
      Frequence:[null, [Validators.required]]


    });
    this.ActionForm.get('CanalDiffusion').setValue(null);
    this.ActionForm.get('CanalDiffusion').valueChanges
      .subscribe(value => {
        console.log(value);
        if (value.value == 1) {
          this.ActionForm.get('SMSBody').setValidators(Validators.required);
          this.ActionForm.get('TypeContenue').setValidators(null);
          this.ActionForm.get('myChoices').setValidators(null);
        } else {
          this.ActionForm.get('SMSBody').setValidators(null);
          this.ActionForm.get('TypeContenue').setValidators(Validators.required);
          this.ActionForm.get('myChoices').setValidators(null);
        }
      });
  }

  get formControls() { return this.ActionForm.controls; }


   submit() {


  
    this.isSubmitted = !this.isSubmitted;
    
    if(this.ActionForm.valid){

      console.log("yes")
    this.action = new ActionMarketing();


    // var response = await this.CreatePopulationCible(this.populationCible).toPromise();
    // if (response.result == 1) {
    //   this.action.idPopulationCible = response.objectResponse.idPopulationCible;
    // }


    this.action.idPartenaire = this.id;
    this.action.idCategorie = this.partenaire.idSector;
    this.action.titre=this.ActionForm.value.titre;
    this.action.description = this.ActionForm.value.Description;
    this.action.dateDebut = this.ActionForm.value.dateDebutPub;
    this.action.dateFin = this.ActionForm.value.dateFinPub;
    this.action.dateCreation = new Date();
    this.action.externUrl = this.ActionForm.value.LienPub;
    this.action.frequence=this.ActionForm.value.Frequence;
    this.action.libelleCanalDiffusion=this.ActionForm.value.CanalDiffusion ;
  
    if (this.ActionForm.value.CanalDiffusion ==1) {
      this.action.smsBody = this.ActionForm.value.SMSBody;
     this.ajouteraction(this.action);
    } else if (this.ActionForm.value.CanalDiffusion ==0) {
      this.action.externUrl = "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg";
      
      this.action.typeAffichageMobile = this.ActionForm.value.myChoices;
      this.action.typeContenue=this.ActionForm.value.TypeContenue;
      
     
     this.ajouteractionavecmedia(this.action);
    } else {
      this.action.externUrl = "https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg";

    }
    console.log(this.action);
   
  }
  }







  test() {
    this.isSubmitted = !this.isSubmitted;
    console.log(this.ActionForm)
    console.log(this.ActionForm.value.myChoices)
    console.log(this.action)
  }


  tests(event) {
    console.log(event)
  }



  getAllSectors(id) {
    this._Categoriepubendpointservice.findAllCategoriePub(id).subscribe(response => {
      if (response.result == 1) {
        this.sectors = response.objectResponse;
        console.log(response.objectResponse)
      }
    });
  }


  CreatePopulationCible(populationCible: PopulationCible) {
    return this._populationCibleService.CreatePopulationCible(populationCible);
  }


  ajouteractionavecmedia(action: ActionMarketing) {
    this._Actionmarketingendpointservice.uplodeimage(this.file).subscribe(response=>{
      if(response.result==1){
        action.idStorage=response.objectResponse.idStorage;
        console.log( this.action.idStorage)
        this._Actionmarketingendpointservice.CreateActionMarketing(action).subscribe(val =>
         { console.log( val.objectResponse)
           if(val.result==1){
          this._GlobalService.showToast("success", "success", "Action ajouter avec succés")
          }else
          this._GlobalService.showToast("danger", "Erreur", val.errorDescription);
        }
        )
      }else
      this._GlobalService.showToast("danger", "Erreur", response.errorDescription);
     
    });
  
  }
  ajouteraction(action: ActionMarketing) {

        this._Actionmarketingendpointservice.CreateActionMarketing(action).subscribe(val =>
         { if(val.result==1){
          this._GlobalService.showToast("success", "success", "Action ajouter avec succés")
          }else
          this._GlobalService.showToast("danger", "Erreur", val.errorDescription);
        }
        )
  }

  select(event){
    console.log("yes")
    this.file=event.files[0];
  }
}
