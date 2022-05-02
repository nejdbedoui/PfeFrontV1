import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionMarketing } from '../../../../model/ActionMarketing';
import { CategoriePub } from '../../../../model/CategoriePub';
import { PartenaireBprice } from '../../../../model/PartenaireBprice';
import { ActionMarketingEndPointServiceService } from '../../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { CategoriePubEndPointServiceService } from '../../../../service/bp-api-action-marketing/categorie-pub-end-point/categorie-pub-end-point-service.service';
import { PartenaireBpriceEndPointService } from '../../../../service/bp-api-pos/partenaire-bprice-end-point/partenaire-bprice-end-point.service';
import { GlobalServiceService } from '../../../../service/GlobalService/global-service.service';


@Component({
  selector: 'ngx-details-action',
  templateUrl: './details-action.component.html',
  styleUrls: ['./details-action.component.scss']
})
export class DetailsActionComponent implements OnInit {
action:ActionMarketing;
showmedia:boolean=false;
partenair:PartenaireBprice;
categorie:CategoriePub;
activer:boolean=false;
ActionForm: FormGroup;
optionContenue: any[];
optionCanalDiffusion: any[];

  constructor(private _FormBuilder: FormBuilder,private _GlobalService:GlobalServiceService,private _Categoriepubendpointservice: CategoriePubEndPointServiceService,private _router:Router,private _actionMarketingService:ActionMarketingEndPointServiceService,private route:ActivatedRoute,private _partenaireservice:PartenaireBpriceEndPointService) {
    this.optionCanalDiffusion = [{ label: 'Mobile', value: 'mobile' }, { label: 'SMS', value: 'sms' }, { label: 'TV', value: 'tv' }];
    this.optionContenue = [{ label: 'Image', value: 'image' }, { label: 'Video', value: 'video' }];
 
   }

  ngOnInit() {
    
   


    this._actionMarketingService.findByidActionMarketing(this.route.snapshot.paramMap.get('id')).subscribe(val1=>
      {
        if(val1.result==1)
       { this.action=val1.objectResponse
       


        this._partenaireservice.findByIdPartenaire(val1.objectResponse.idPartenaire).subscribe(val2=>
          {
            if(val2.result==1){
              this.partenair=val2.objectResponse
              
            }
          
          })


          this._Categoriepubendpointservice.findByidCategorie(val1.objectResponse.idCategorie).subscribe(val3=>

            {  if(val3.result==1)
              this.categorie=val3.objectResponse
              this.showmedia=true;
              console.log(this.categorie)
            }
              )


    }
     });
      
    

  }


  delete(){
    if(confirm("would you like to delete this action")){

    
    this._actionMarketingService.deleteActionMarketing(this.route.snapshot.paramMap.get('id')).subscribe(val=>
      
     { if(val.result==1){
      this._GlobalService.showToast("success", "success", "Action supprimé avec succès")
       this._router.navigateByUrl("pages/gestionpub/gestionactionmarketing");
      }else
      this._GlobalService.showToast("danger", "Erreur", val.errorDescription)
    
    
    }
      
      )
  }}

  InstanciateForm() {
    this.ActionForm = this._FormBuilder.group({
      SecteurActivite: [this.action.idCategorie, [Validators.required]],
      CanalDiffusion: [[this.action.libelleCanalDiffusion], [Validators.required]],
      LienPub: [[this.action.url], [Validators.required]],
      titre: [[this.action.titre], [Validators.required]],
      Description: [[this.action.description], [Validators.required]],
      dateDebutPub: [[this.action.dateDebut], [Validators.required]],
      dateFinPub: [[this.action.dateFin], [Validators.required]],
      myChoices: [new FormArray([]), []],
      Atatchement: [null, [Validators.required]],
      SMSBody: [[this.action.smsBody], []],
      TypeContenue: [[this.action.typeContenue], []],
      Frequence:[[this.action.frequence], [Validators.required]]


    });
 
  }
  modifier(){
    this.activer=!this.activer;
  }
}
