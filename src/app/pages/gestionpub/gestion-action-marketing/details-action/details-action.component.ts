import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionMarketing } from '../../../../model/ActionMarketing';
import { DetailsActionDTO } from '../../../../model/dto/DetailsActionDTO';

import { PartenaireBprice } from '../../../../model/PartenaireBprice';
import { PopulationCible } from '../../../../model/PopulationCible';
import { Sector } from '../../../../model/Sector';
import { Ville } from '../../../../model/Ville';
import { ActionMarketingEndPointServiceService } from '../../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { CategoriePubEndPointServiceService } from '../../../../service/bp-api-action-marketing/categorie-pub-end-point/categorie-pub-end-point-service.service';
import { DetailsActionService } from '../../../../service/bp-api-action-marketing/details-action-dto-end-point/details-action.service';
import { PopulationCibleEndPointServiceService } from '../../../../service/bp-api-action-marketing/population-cible-end-point/population-cible-end-point-service.service';
import { VilleEndPointService } from '../../../../service/bp-api-action-marketing/ville-end-point/ville-end-point.service';
import { PartenaireBpriceEndPointService } from '../../../../service/bp-api-pos/partenaire-bprice-end-point/partenaire-bprice-end-point.service';
import { GlobalServiceService } from '../../../../service/GlobalService/global-service.service';


@Component({
  selector: 'ngx-details-action',
  templateUrl: './details-action.component.html',
  styleUrls: ['./details-action.component.scss']
})
export class DetailsActionComponent implements OnInit {

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
  villes: Ville[];
  optionSexe:any[];

id:string;
details:DetailsActionDTO;
populationCible:PopulationCible;
  datePipe: any;
  constructor(private _DetailsactiondtoService:DetailsActionService,private _FormBuilder: FormBuilder,private _villeEndpoint: VilleEndPointService, private _GlobalService: GlobalServiceService, private _Categoriepubendpointservice: CategoriePubEndPointServiceService, private _router: Router, private _actionMarketingService: ActionMarketingEndPointServiceService, private route: ActivatedRoute, private _partenaireservice: PartenaireBpriceEndPointService,private _populationcibleService:PopulationCibleEndPointServiceService) {
    this.optionCanalDiffusion = [{ label: 'Mobile', value: 0 }, { label: 'SMS', value: 1 }, { label: 'TV', value: 2 }];
    this.optionContenue = [{ label: 'Image', value: 0 }, { label: 'Video', value: 1 }];
this.id=this.route.snapshot.paramMap.get('id');
this.optionSexe = [{ label: 'Homme / Femme', value: 2 }, { label: 'Homme', value: 1 },{ label: 'Femme', value: 0 }];
  }

  ngOnInit() {

    this.ville();
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
  ville() {
    this._villeEndpoint.findAllActiveCanal().subscribe(val => {
      if (val.result == 1) {
        this.villes = val.objectResponse;
        console.log(this.villes)

      }
    })
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
       this.sectors= response.objectResponse;

      }
    });
  }


  InstanciateForm() {

    this.ActionForm = this._FormBuilder.group({
      titre: [null, [Validators.required]],
      Description: [null, [Validators.required]],
      dateDebutPub: [null, [Validators.required]],
      dateFinPub: [null, [Validators.required]],
      Frequence: [null, [Validators.required]],
      SMSBody: [null, []],
      TypeContenue: ["", [Validators.required]],
      Secteurcible: [[], [Validators.required]],
      villes:[[],[]],
      sexe:[null,[Validators.required]],
      agemin:[16,[]],
      agemax:[50,[Validators.required]],
      LienExterne: ['', []],//
    },{
      validator: [
        CustomeDateValidators.fromToDate('dateDebutPub', 'dateFinPub')
        
        // For custome error name like: {customeErrorName: true}, pass third optional parameter with custome name
        // CustomeDateValidators.fromToDate('fromDate', 'toDate', 'customeErrorName')
      ]}   
    )
  }

  

 
  get formControls() { return this.ActionForm.controls; }
  modifier() {
    this.ActionForm.get('agemax').setValidators([Validators.required,Validators.min(this.ActionForm.value.agemin)]);
    this.ActionForm.get("titre").setValue(this.action.titre);
    this.ActionForm.get("dateDebutPub").setValue(new Date(this.action.dateDebut));
    this.ActionForm.get("dateFinPub").setValue(new Date(this.action.dateFin));
    this.ActionForm.get("Frequence").setValue(this.action.frequence);
    this.ActionForm.get("Description").setValue(this.action.description);
    this.ActionForm.get("SMSBody").setValue(this.action.smsBody);
    this.ActionForm.get("TypeContenue").setValue(this.action.typeContenue);
    this.ActionForm.get("sexe").setValue(this.details.sexe);
    this.ActionForm.get("LienExterne").setValue(this.action.externUrl);
    let selectedsecteur = [];
    let selectedvilles = [];
    this.sectors.forEach(value=>{
      if(this.action.secteurcible.includes(value.idClientType))
      selectedsecteur.push(value)
    });
    this.ActionForm.get("Secteurcible").setValue(selectedsecteur);
    this.villes.forEach(value=>{
      if(this.details.ville.includes(value.libelle))
      selectedvilles.push(value)
    });
    this.ActionForm.get("villes").setValue(selectedvilles);  


    

   

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
      this.action.notification=1;
      this.action.statut=1;
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
export class CustomeDateValidators {
  static fromToDate(fromDateField: string, toDateField: string, errorName: string = 'fromToDate'): ValidatorFn {
      return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
          const fromDate = formGroup.get(fromDateField).value;
          const toDate = formGroup.get(toDateField).value;
         // Ausing the fromDate and toDate are numbers. In not convert them first after null check
          if ((fromDate !== null && toDate !== null) && fromDate > toDate) {
              return {[errorName]: true};
          }
          return null;
      };
  }
}

//   action: ActionMarketing;
//   showmedia: boolean = false;
//   partenair: PartenaireBprice;
//   categorie: Sector;
//   activer: boolean = false;
//   ActionForm: FormGroup;
//   optionContenue: any[];
//   optionCanalDiffusion: any[];
//   sectors: Sector[];
// id:string;
// details:DetailsActionDTO;
//   constructor(private _DetailsactiondtoService:DetailsActionService,private _FormBuilder: FormBuilder, private _GlobalService: GlobalServiceService, private _Categoriepubendpointservice: CategoriePubEndPointServiceService, private _router: Router, private _actionMarketingService: ActionMarketingEndPointServiceService, private route: ActivatedRoute, private _partenaireservice: PartenaireBpriceEndPointService) {
//     this.optionCanalDiffusion = [{ label: 'Mobile', value: 0 }, { label: 'SMS', value: 1 }, { label: 'TV', value: 2 }];
//     this.optionContenue = [{ label: 'Image', value: 0 }, { label: 'Video', value: 1 }];
// this.id=this.route.snapshot.paramMap.get('id');
//   }

//   ngOnInit() {
    
//     this._actionMarketingService.findByidActionMarketing(this.id).subscribe(val1 => {
//       if (val1.result == 1) {
//         this.action = val1.objectResponse
//         this._DetailsactiondtoService.findDetailsByAction(this.action).subscribe(result=>{
//           if(result.result==1){
//             this.details=result.objectResponse;
//             this.showmedia=true;
//             console.log(this.details)
//           }
//         })
//       }
//     });


    
    
  


//   }

//   sexe(stat:number){
//     if(stat==0)
//     return "Homme et Femme"
//     else if(stat==1)
//     return "Homme"
//     else if(stat==2)
//     return "Femme"
//   }
//   getStatusAction(stat:number){
//     if(stat==0)
//     return "Crée"
//     else if(stat==1)
//     return "En Attente"
//     else if(stat==2)
//     return "Confirmé"
//     else if(stat==3)
//     return "Refusé"
//     else if(stat==4)
//     return "En Cours"
//     else if(stat==5)
//     return "Terminée"
//   }

//   delete() {
//     if (confirm("would you like to delete this action")) {
//       this._actionMarketingService.deleteActionMarketing(this.route.snapshot.paramMap.get('id')).subscribe(val => {
//         if (val.result == 1) {
//           this._GlobalService.showToast("success", "success", "Action supprimé avec succès")
//           this._router.navigateByUrl("pages/gestionpub/gestionactionmarketing");
//         } else
//           this._GlobalService.showToast("danger", "Erreur", val.errorDescription)
//       })
//     }
//   }

//   confirm() {
//     this.action.statut = 1;
//     this.action.notification=2;
//     this._actionMarketingService.updateActionMarketing(this.action).subscribe(val => {
//       if (val.result == 1) {
//         this._GlobalService.showToast("success", "success", "Action confirmer")
//       }

//     }
//     )
//   }

//   getAllSectors(id) {
//     this._Categoriepubendpointservice.findAllCategoriePub(id).subscribe(response => {
//       if (response.result == 1) {
//         this.sectors = response.objectResponse;

//       }
//     });
//   }


//   InstanciateForm() {

//     this.ActionForm = this._FormBuilder.group({
//       titre: [this.action.titre, [Validators.required]],
//       Description: [this.action.description, [Validators.required]],
//       Frequence: [this.action.frequence, [Validators.required]],
//       dateDebutPub: [this.action.dateDebut, [Validators.required]],
//       dateFinPub: [this.action.dateFin, [Validators.required]],
//       myChoices: [new FormArray([]), []],
//       Atatchement: [null, [Validators.required]],
//       SMSBody: [this.action.smsBody, []],
//       TypeContenue: [this.action.idFormatAffichage, []],
      



//     });

//   }
//   get formControls() { return this.ActionForm.controls; }
//   modifier() {
//     if(!this.ActionForm){
//       this.InstanciateForm();
//     }
//     if(!this.sectors){
//       this.getAllSectors(this.details.idSector);
//     }
//     this.activer = !this.activer;
//   }
//   submit() {

//     this.action.idCategorie = this.ActionForm.value.SecteurActivite;
//     this.action.titre = this.ActionForm.value.titre;


//     if (this.ActionForm.value.CanalDiffusion == 1) {
//       this.action.smsBody = this.ActionForm.value.SMSBody;

//     } else if (this.ActionForm.value.CanalDiffusion == 0) {

//       this.action.idFormatAffichage = this.ActionForm.value.myChoices;
//       this.action.idFormatAffichage = this.ActionForm.value.TypeContenue;

//     } else {

//     }
//     this._actionMarketingService.updateActionMarketing(this.action).subscribe(val => {
//       if (val.result == 1) {
//         this._GlobalService.showToast("success", "success", "Action modifier avec succés")
//         this.modifier();
//       }
//     });
//   }

