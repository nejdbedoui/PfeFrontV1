import { Component, Injectable, OnInit } from '@angular/core';
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
import { CanalDiffusionEndPointService } from '../../../../service/bp-api-action-marketing/canal-diffusion-end-point/canal-diffusion-end-point.service';
import { FormatAffichageEndPointService } from '../../../../service/bp-api-action-marketing/format-affichage-end-point/format-affichage-end-point.service';
import { CanalDiffusion } from '../../../../model/Canaldiffusion';
import { formataffichage } from '../../../../model/FormatAffichage';
import { VilleEndPointService } from '../../../../service/bp-api-action-marketing/ville-end-point/ville-end-point.service';
import { Ville } from '../../../../model/Ville';
@Component({
  selector: 'ngx-create-action',
  templateUrl: './create-action.component.html',
  styleUrls: ['./create-action.component.scss']
})

@Injectable()
export class CreateActionComponent implements OnInit {

  isSubmitted: boolean = false;
  ActionForm: FormGroup;
  optionContenue: any[];
  sectors: Sector[];
  action: ActionMarketing;
  populationCible: PopulationCible;
  id: string = localStorage.getItem("partenaireid");
  file: any;
  partenaire: PartenaireBprice;
  canal: CanalDiffusion[];
  format: formataffichage[];
  showmedia: boolean = false;
  canal1: string;
  villes: Ville[];
  optionSexe:any[];


  constructor(private _villeEndpoint: VilleEndPointService, private _Canalservice: CanalDiffusionEndPointService, private _formataffichageservice: FormatAffichageEndPointService, private _Partenaire: PartenaireBpriceEndPointService, private _GlobalService: GlobalServiceService, private _FormBuilder: FormBuilder, private _populationCibleService: PopulationCibleEndPointServiceService, private _Actionmarketingendpointservice: ActionMarketingEndPointServiceService, private _Categoriepubendpointservice: CategoriePubEndPointServiceService) {
    this.optionContenue = [{ label: 'Image', value: 0 }, { label: 'Video', value: 1 }];
    this.optionSexe = [{ label: 'H/M', value: 0 }, { label: 'Homme', value: 1 },{ label: 'Femme', value: 2 }];
  }



  ngOnInit() {
    this._Partenaire.findByIdPartenaire(this.id).subscribe(val => {
      this.getAllSectors(val.objectResponse.idSector);
      this.partenaire = val.objectResponse;
    })

    this.InstanciateForm();
    this.canaldiffusion();
    this.ville();
    this.showmedia = true;
  }
  ville() {
    this._villeEndpoint.findAllActiveCanal().subscribe(val => {
      if (val.result == 1) {
        this.villes = val.objectResponse;
        console.log(this.villes)
      }
    })
  }

  canaldiffusion() {
    this._Canalservice.findAllActiveCanal().subscribe(val => {
      if (val.result == 1) {
        this.canal = val.objectResponse;
      }
    })
  }

  formataffichage(type: CanalDiffusion) {
    this.ActionForm.controls["formataffichage"].reset();
    console.log(this.ActionForm.value.formataffichage)
    this._formataffichageservice.findAllActiveformat(type.libelle).subscribe(val => {
      if (val.result == 1) {
        this.format = val.objectResponse;
      }
    })
  }


  InstanciateForm() {
    this.ActionForm = this._FormBuilder.group({
      SecteurActivite: [null, [Validators.required]],
      CanalDiffusion: [new CanalDiffusion, [Validators.required]],
      LienPub: ['', [Validators.required]],
      titre: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      dateDebutPub: [null, [Validators.required]],
      dateFinPub: [null, [Validators.required]],
      formataffichage: [null, []],
      SMSBody: ['', []],
      TypeContenue: [null, []],
      Frequence: [null, [Validators.required]],
      sexe:[null,[Validators.required]],
      ville:[[],[Validators.required]]


    });
    this.ActionForm.get('CanalDiffusion').setValue(null);
    this.ActionForm.get('CanalDiffusion').valueChanges
      .subscribe(value => {
        this.canal1 = value.libelle;
        if (value.libelle == "SMS") {
          this.ActionForm.get('SMSBody').setValidators(Validators.required);
          this.ActionForm.get('TypeContenue').setValidators(null);
          this.ActionForm.get('formataffichage').setValidators(null);
        } else {
          this.ActionForm.get('SMSBody').setValidators(null);
          this.ActionForm.get('TypeContenue').setValidators(Validators.required);
          this.ActionForm.get('formataffichage').setValidators(null);
        }
      });
  }

  get formControls() { return this.ActionForm.controls; }


  submit() {

console.log(this.ActionForm)
console.log(this.ActionForm.valid)
    this.isSubmitted = !this.isSubmitted;

    if (this.ActionForm.valid) {

      console.log("yes")
      this.action = new ActionMarketing();

      this.action.idPartenaire = this.id;
      this.action.idCategorie = this.partenaire.idSector;
      this.action.titre = this.ActionForm.value.titre;
      this.action.description = this.ActionForm.value.Description;
      this.action.dateDebut = this.ActionForm.value.dateDebutPub;
      this.action.dateFin = this.ActionForm.value.dateFinPub;
      this.action.dateCreation = new Date();
      this.action.externUrl = this.ActionForm.value.LienPub;
      this.action.frequence = this.ActionForm.value.Frequence;
      this.populationCible=new PopulationCible;
      this.populationCible.sexe=this.ActionForm.value.sexe
          let stri=[];
          this.ActionForm.value.ville.forEach(function(item:Ville){
            stri.push(item.idVille);
            console.log( stri)
          });
          this.populationCible.idville=stri;


      this.action.idCanaldiffusion = this.ActionForm.value.CanalDiffusion.idCanaldiffusion;

      if (this.ActionForm.value.CanalDiffusion.libelle == "SMS") {
        this.action.smsBody = this.ActionForm.value.SMSBody;
        this.ajouteraction(this.action,this.populationCible);
      } else if (this.ActionForm.value.CanalDiffusion.libelle == "Mobile") {
       
        this.action.idFormatAffichage = this.ActionForm.value.formataffichage;
        this.action.typeContenue = this.ActionForm.value.TypeContenue;


        this.ajouteractionavecmedia(this.action,this.populationCible);
      } else if(this.ActionForm.value.CanalDiffusion.libelle =="TV") {
       
      }
      console.log(this.action);

    }
  }







  test() {
    
    console.log( this.populationCible);
    this.isSubmitted = !this.isSubmitted;
    console.log(this.ActionForm)

 

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


  ajouteractionavecmedia(action: ActionMarketing,populationCible:PopulationCible) {


    this._populationCibleService.CreatePopulationCible(populationCible).subscribe(result=>{
      action.idPopulationCible=result.objectResponse.idPopulationCible;

  this._Actionmarketingendpointservice.uplodeimage(this.file).subscribe(response => {
      if (response.result == 1) {
        action.idStorage = response.objectResponse.idStorage;
       

        this._Actionmarketingendpointservice.CreateActionMarketing(action).subscribe(val => {
          
          if (val.result == 1) {
            this._GlobalService.showToast("success", "success", "Action ajouter avec succés")
          } else
            this._GlobalService.showToast("danger", "Erreur", val.errorDescription);
        }
        )
      } else
        this._GlobalService.showToast("danger", "Erreur", response.errorDescription);

    });
    })
  

  }
  ajouteraction(action: ActionMarketing,populationCible:PopulationCible) {

    this._populationCibleService.CreatePopulationCible(populationCible).subscribe(result=>{
      action.idPopulationCible=result.objectResponse.idPopulationCible;
      this._Actionmarketingendpointservice.CreateActionMarketing(action).subscribe(val => {
        if (val.result == 1) {
          this._GlobalService.showToast("success", "success", "Action ajouter avec succés")
        } else
          this._GlobalService.showToast("danger", "Erreur", val.errorDescription);
      }
      )

    })
    
  }

  select(event) {
    this.file = event.files[0];
  }
}
