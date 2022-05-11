import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionMarketing } from '../../../../model/ActionMarketing';
import { PartenaireBprice } from '../../../../model/PartenaireBprice';
import { Sector } from '../../../../model/Sector';
import { ActionMarketingEndPointServiceService } from '../../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { CategoriePubEndPointServiceService } from '../../../../service/bp-api-action-marketing/categorie-pub-end-point/categorie-pub-end-point-service.service';
import { PartenaireBpriceEndPointService } from '../../../../service/bp-api-pos/partenaire-bprice-end-point/partenaire-bprice-end-point.service';
import { GlobalServiceService } from '../../../../service/GlobalService/global-service.service';

@Component({
  selector: 'ngx-detail-action',
  templateUrl: './detail-action.component.html',
  styleUrls: ['./detail-action.component.scss']
})
export class DetailActionComponent implements OnInit {

  action: ActionMarketing;
  showmedia: boolean = false;
  partenair: PartenaireBprice;
  categorie: Sector;
  activer: boolean = false;
  ActionForm: FormGroup;
  optionContenue: any[];
  optionCanalDiffusion: any[];
  sectors: Sector[];
url:any;
id=this.route.snapshot.paramMap.get('id');
  constructor(private _FormBuilder: FormBuilder, private _GlobalService: GlobalServiceService, private _Categoriepubendpointservice: CategoriePubEndPointServiceService, private _router: Router, private _actionMarketingService: ActionMarketingEndPointServiceService, private route: ActivatedRoute, private _partenaireservice: PartenaireBpriceEndPointService) {
    this.optionCanalDiffusion = [{ label: 'Mobile', value: 0 }, { label: 'SMS', value: 1 }, { label: 'TV', value: 2 }];
    this.optionContenue = [{ label: 'Image', value: 0 }, { label: 'Video', value: 1 }];

  }

  ngOnInit() {
    
    this._actionMarketingService.findByidActionMarketing(this.id).subscribe(val1 => {
      if (val1.result == 1) {
        this.action = val1.objectResponse
        
        this._Categoriepubendpointservice.findByidCategorie(val1.objectResponse.idCategorie).subscribe(val3 => {
          if (val3.result == 1)
            this.categorie = val3.objectResponse
         
          console.log(this.action)
          this.InstanciateForm();
          this._actionMarketingService.findfileByid(this.action.idStorage).subscribe(val=>{
            this.url=val.objectResponse.url;
            this.showmedia = true;
           
          })
        }
        )
      }
    });
this._partenaireservice.findByIdPartenaire(this.id).subscribe(val=>
  {
    this.getAllSectors(val.objectResponse.idSector);
  }
  )


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

  Parametrer() {
    this._router.navigateByUrl("pages/gestionpub/gestionactionmarketingadmin/parametrage/"+this.action.idActionMarketing);
    
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
