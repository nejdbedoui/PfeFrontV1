import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionMarketing } from '../../../../model/ActionMarketing';
import { DetailsActionDTO } from '../../../../model/dto/DetailsActionDTO';

import { PartenaireBprice } from '../../../../model/PartenaireBprice';
import { Sector } from '../../../../model/Sector';
import { ActionMarketingEndPointServiceService } from '../../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { CategoriePubEndPointServiceService } from '../../../../service/bp-api-action-marketing/categorie-pub-end-point/categorie-pub-end-point-service.service';
import { DetailsActionService } from '../../../../service/bp-api-action-marketing/details-action-dto-end-point/details-action.service';
import { PartenaireBpriceEndPointService } from '../../../../service/bp-api-pos/partenaire-bprice-end-point/partenaire-bprice-end-point.service';
import { GlobalServiceService } from '../../../../service/GlobalService/global-service.service';


@Component({
  selector: 'ngx-details-action',
  templateUrl: './details-action.component.html',
  styleUrls: ['./details-action.component.scss']
})
export class DetailsActionComponent implements OnInit {
  action: ActionMarketing;
  showmedia: boolean = false;
  partenair: PartenaireBprice;
  categorie: Sector;
  activer: boolean = false;
  ActionForm: FormGroup;
  optionContenue: any[];
  optionCanalDiffusion: any[];
  sectors: Sector[];
id:string;
details:DetailsActionDTO;
  constructor(private _DetailsactiondtoService:DetailsActionService,private _FormBuilder: FormBuilder, private _GlobalService: GlobalServiceService, private _Categoriepubendpointservice: CategoriePubEndPointServiceService, private _router: Router, private _actionMarketingService: ActionMarketingEndPointServiceService, private route: ActivatedRoute, private _partenaireservice: PartenaireBpriceEndPointService) {
    this.optionCanalDiffusion = [{ label: 'Mobile', value: 0 }, { label: 'SMS', value: 1 }, { label: 'TV', value: 2 }];
    this.optionContenue = [{ label: 'Image', value: 0 }, { label: 'Video', value: 1 }];
this.id=this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    
    this._actionMarketingService.findByidActionMarketing(this.id).subscribe(val1 => {
      if (val1.result == 1) {
        this.action = val1.objectResponse
        this._DetailsactiondtoService.findDetailsByAction(this.action).subscribe(result=>{
          if(result.result==1){
            this.details=result.objectResponse;
            this.showmedia=true;
            console.log(this.details)
          }
        })
      }
    });

this._partenaireservice.findByIdPartenaire(localStorage.getItem("partenaire2")).subscribe(val=>
  {
    this.getAllSectors(val.objectResponse.idSector);
  }
  )


  }

  sexe(stat:number){
    if(stat==0)
    return "Homme et Femme"
    else if(stat==1)
    return "Homme"
    else if(stat==2)
    return "Femme"
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

  delete() {
    if (confirm("would you like to delete this action")) {
      this._actionMarketingService.deleteActionMarketing(this.route.snapshot.paramMap.get('id')).subscribe(val => {
        if (val.result == 1) {
          this._GlobalService.showToast("success", "success", "Action supprimé avec succès")
          this._router.navigateByUrl("pages/gestionpub/gestionactionmarketing");
        } else
          this._GlobalService.showToast("danger", "Erreur", val.errorDescription)
      })
    }
  }

  confirm() {
    this.action.statut = 1;
    this.action.notification=2;
    this._actionMarketingService.updateActionMarketing(this.action).subscribe(val => {
      if (val.result == 1) {
        this._GlobalService.showToast("success", "success", "Action confirmer")
      }

    }
    )
  }

  getAllSectors(id) {
    this._Categoriepubendpointservice.findAllCategoriePub(id).subscribe(response => {
      if (response.result == 1) {
        this.sectors = response.objectResponse;

      }
    });
  }


  InstanciateForm() {

    this.ActionForm = this._FormBuilder.group({
      SecteurActivite: [this.categorie.designation, [Validators.required]],
      CanalDiffusion: [this.action.idCanaldiffusion, [Validators.required]],
      LienPub: [this.action.externUrl, [Validators.required]],
      titre: [this.action.titre, [Validators.required]],
      Description: [this.action.description, [Validators.required]],
      dateDebutPub: [this.action.dateDebut, [Validators.required]],
      dateFinPub: [this.action.dateFin, [Validators.required]],
      myChoices: [new FormArray([]), []],
      Atatchement: [null, [Validators.required]],
      SMSBody: [this.action.smsBody, []],
      TypeContenue: [this.action.typeContenue, []],
      Frequence: [this.action.frequence, [Validators.required]],



    });

  }
  get formControls() { return this.ActionForm.controls; }
  modifier() {
    this.activer = !this.activer;
  }
  submit() {

    this.action.idCategorie = this.ActionForm.value.SecteurActivite;
    this.action.titre = this.ActionForm.value.titre;


    if (this.ActionForm.value.CanalDiffusion == 1) {
      this.action.smsBody = this.ActionForm.value.SMSBody;

    } else if (this.ActionForm.value.CanalDiffusion == 0) {

      this.action.idFormatAffichage = this.ActionForm.value.myChoices;
      this.action.typeContenue = this.ActionForm.value.TypeContenue;

    } else {

    }
    this._actionMarketingService.updateActionMarketing(this.action).subscribe(val => {
      if (val.result == 1) {
        this._GlobalService.showToast("success", "success", "Action modifier avec succés")
        this.modifier();
      }
    });
  }


}
