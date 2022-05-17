import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionMarketing } from '../../../../model/ActionMarketing';
import { DetailsActionDTO } from '../../../../model/dto/DetailsActionDTO';
import { PartenaireBprice } from '../../../../model/PartenaireBprice';
import { PopulationCible } from '../../../../model/PopulationCible';
import { Sector } from '../../../../model/Sector';
import { ActionMarketingEndPointServiceService } from '../../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { CategoriePubEndPointServiceService } from '../../../../service/bp-api-action-marketing/categorie-pub-end-point/categorie-pub-end-point-service.service';
import { DetailsActionService } from '../../../../service/bp-api-action-marketing/details-action-dto-end-point/details-action.service';
import { PopulationCibleEndPointServiceService } from '../../../../service/bp-api-action-marketing/population-cible-end-point/population-cible-end-point-service.service';
import { PartenaireBpriceEndPointService } from '../../../../service/bp-api-pos/partenaire-bprice-end-point/partenaire-bprice-end-point.service';
import { GlobalServiceService } from '../../../../service/GlobalService/global-service.service';

@Component({
  selector: 'ngx-detail-action',
  templateUrl: './detail-action.component.html',
  styleUrls: ['./detail-action.component.scss']
})
export class DetailActionComponent implements OnInit {
  isSubmitted:boolean = false;
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
populationCible:PopulationCible;
  datePipe: any;
  constructor(private _DetailsactiondtoService:DetailsActionService,private _FormBuilder: FormBuilder, private _GlobalService: GlobalServiceService, private _Categoriepubendpointservice: CategoriePubEndPointServiceService, private _router: Router, private _actionMarketingService: ActionMarketingEndPointServiceService, private route: ActivatedRoute, private _partenaireservice: PartenaireBpriceEndPointService,private _populationcibleService:PopulationCibleEndPointServiceService) {
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
          else{
            this.InstanciateForm();
          }
        })
        this._populationcibleService.findByidPopulationCible(this.action.idPopulationCible).subscribe(response=>{
          if (response.result==1){
            this.populationCible = response.objectResponse;
          }
        });
      }
    });

this._partenaireservice.findByIdPartenaire(localStorage.getItem("partenaireid")).subscribe(val=>
  {
    this.getAllSectors(val.objectResponse.idSector);
  }
  )
  
  
  this.InstanciateForm();


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
      dateDebutPub: [null, [Validators.required]],
      dateFinPub: [null, [Validators.required]],
      Frequence: [null, [Validators.required]],

    });
  }

  

 
  get formControls() { return this.ActionForm.controls; }
  modifier() {
    this.ActionForm.get("dateDebutPub").setValue(this.action.dateDebut);
    this.ActionForm.get("dateFinPub").setValue(this.action.dateFin);
    this.ActionForm.get("Frequence").setValue(this.action.frequence);
   

    this.activer = !this.activer;
  }

  submit() {
    this.isSubmitted = true;
    if(this.ActionForm.valid){

    if(this.action.frequence==this.ActionForm.value.Frequence && this.action.dateDebut==this.ActionForm.value.dateDebutPub && this.action.dateFin==this.ActionForm.value.dateFinPub){
      this.modifier();
    }
    else{
      this.action.frequence=this.ActionForm.value.Frequence;
      this.action.dateDebut=this.ActionForm.value.dateDebutPub;
      this.action.dateFin==this.ActionForm.value.dateFinPub;
      this._actionMarketingService.updateActionMarketing(this.action).subscribe(val => {
        if (val.result == 1) {
          this.action=val.objectResponse;
          this._GlobalService.showToast("success", "success", "Action Créer avec succés")
          this.modifier();
        }
      });
    }
    
  }
}


}
