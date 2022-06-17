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
import { FormatAffichage } from '../../../../model/FormatAffichage';
import { VilleEndPointService } from '../../../../service/bp-api-action-marketing/ville-end-point/ville-end-point.service';
import { Ville } from '../../../../model/Ville';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TypeAffichageEndPointServiceService } from '../../../../service/bp-api-action-marketing/type-affichage-end-point/type-affichage-end-point-service.service';
import { TypeAffichage } from '../../../../model/TypeAffichage';
@Component({
  selector: 'ngx-create-action',
  templateUrl: './create-action.component.html',
  styleUrls: ['./create-action.component.scss']
})

@Injectable()
export class CreateActionComponent implements OnInit {

  isSubmitted1: boolean = false;
  isSubmitted2: boolean = false;
  isSubmitted3: boolean = false;
  ActionForm1: FormGroup;
  ActionForm2: FormGroup;
  ActionForm3: FormGroup;
  optionContenue: TypeAffichage[];
  sectors: Sector[];
  action: ActionMarketing;
  populationCible: PopulationCible;
  id: string = localStorage.getItem("partenaire2");
  partenaire: PartenaireBprice;
  canal: CanalDiffusion[];
  format: FormatAffichage[];
  showmedia: boolean = false;
  canal1: string;
  villes: Ville[];
  optionSexe:any[];
  rangeValues: number[]
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  file:any;
afficherimage:boolean=false;
disable:boolean=false;
filterFn:any;
  constructor(private sanitizer: DomSanitizer,private _typeAffichage:TypeAffichageEndPointServiceService,private _router: Router,private _villeEndpoint: VilleEndPointService, private _Canalservice: CanalDiffusionEndPointService, private _formataffichageservice: FormatAffichageEndPointService, private _Partenaire: PartenaireBpriceEndPointService, private _GlobalService: GlobalServiceService, private _FormBuilder: FormBuilder, private _populationCibleService: PopulationCibleEndPointServiceService, private _Actionmarketingendpointservice: ActionMarketingEndPointServiceService, private _Categoriepubendpointservice: CategoriePubEndPointServiceService) {
   // this.optionContenue = [{ label: 'Image', value: 0 }, { label: 'Video', value: 1 }];
   this.optionSexe = [{ label: 'Homme / Femme', value: 0 }, { label: 'Homme', value: 1 },{ label: 'Femme', value: 2 }];
  }



  ngOnInit() {
    let date1:Date=new Date();
    date1.setDate( date1.getDate() + 3 );
    this.filterFn = (date) => date > date1;
    this._Partenaire.findByIdPartenaire(this.id).subscribe(val => {
      this.getAllSectors(val.objectResponse.idSector);
      this.partenaire = val.objectResponse;
    })
    this.getTypeAffichageData();
    this.InstanciateForm();
    this.canaldiffusion();
    this.ville();
    this.showmedia = true;
  }
  isImage(){
    return 
    //this.optionContenue.filter(value=>{
    //   if(value.idTypeAffichage==id&&(value.libelle=="Image" || value.libelle=="GIF"))
    //  found = true;
    // });
    // this.op
    // return found
  }
  getTypeAffichageData(){
    this._typeAffichage.findAllActiveTypeAffichage().subscribe(val=>
      {
        if(val.result==1){
          this.optionContenue=val.objectResponse;
          console.log(this.optionContenue)
        }
        else{
        }
      }
      )

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
    if(this.ActionForm1.value.CanalDiffusion.libelle != "SMS"){
    this.ActionForm2.controls["formataffichage"].reset();
    this._formataffichageservice.findAllActiveformat(type.libelle).subscribe(val => {
      if (val.result == 1) {
        this.format = val.objectResponse;
        console.log(this.format)
      }
    })
  }
  }


  InstanciateForm() {
    this.ActionForm1 = this._FormBuilder.group({
      CanalDiffusion: [new CanalDiffusion, []],//
      LienPub: ['', []],//
      titre: ['', []],//
      Description: ['', []],//
      dateDebutPub: [null, []],//
      dateFinPub: [null, []],//
    });

    this.ActionForm2 = this._FormBuilder.group({
      formataffichage: ['', [Validators.required]],
      SMSBody: ['', [Validators.required]],
      TypeContenue: ["", [Validators.required]],

    });

    this.ActionForm3 = this._FormBuilder.group({
      Secteurcible: [[], []],
      Frequence: [null, [Validators.required]],
      sexe:[null,[Validators.required]],
      ville:[[],[]],
      agemin:[16,[]],
      agemax:[50,[Validators.required]]
    });

    this.ActionForm1.get('CanalDiffusion').setValue(null);
   
  }

  get formControls1() { return this.ActionForm1.controls; }
  get formControls2() { return this.ActionForm2.controls; }
  get formControls3() { return this.ActionForm3.controls; }


  submit() {
this.disable=true;

    if (this.ActionForm1.valid && this.ActionForm2.valid && this.ActionForm3.valid) {

      console.log("yes")
      this.action = new ActionMarketing();

      this.action.idPartenaire = this.id;
      this.action.idCategorie = this.partenaire.idSector;
      this.action.titre = this.ActionForm1.value.titre;
      this.action.description = this.ActionForm1.value.Description;
      this.action.dateDebut = this.ActionForm1.value.dateDebutPub;
      this.action.dateFin = this.ActionForm1.value.dateFinPub;
      this.action.dateCreation = new Date();
      this.action.externUrl = this.ActionForm1.value.LienPub;
      this.action.frequence = this.ActionForm3.value.Frequence;
      this.populationCible=new PopulationCible;
      this.populationCible.sexe=this.ActionForm3.value.sexe
      this.populationCible.factif=1
      console.log(this.ActionForm3.value.ville)
      this.action.notification=0;
      if(this.ActionForm3.value.ville != null){
          let stri=[];
          this.ActionForm3.value.ville.forEach(function(item:Ville){
            if(item.idVille !=null){
              stri.push(item.idVille);
            }
            
            
          });
          this.populationCible.ville=stri;

            let agerange:number[]= [];
            agerange[0]=this.ActionForm3.value.agemin;
            agerange[1]=this.ActionForm3.value.agemax;
            this.populationCible.age = agerange;
            console.log(this.populationCible)

          

         
      
}
if(this.ActionForm3.value.Secteurcible !=null){
  let sec=[];
  this.ActionForm3.value.Secteurcible.forEach(function(item:Sector){
    if(item.idClientType != null){
      sec.push(item.idClientType);
    }
    
    
  });
  this.action.secteurcible=sec;
  console.log(this.action.secteurcible)
}
      this.action.idCanaldiffusion = this.ActionForm1.value.CanalDiffusion.idCanaldiffusion;

      console.log(this.file)
      if (this.ActionForm1.value.CanalDiffusion.libelle == "SMS") {
        this.action.smsBody = this.ActionForm2.value.SMSBody;
        this.ajouteraction(this.action,this.populationCible);
      } else if (this.ActionForm1.value.CanalDiffusion.libelle == "Mobile") {
       
        this.action.idFormatAffichage = this.ActionForm2.value.formataffichage;
        this.action.idTypeAffichage = this.ActionForm2.value.TypeContenue;


       this.ajouteractionavecmedia(this.action,this.populationCible);
      } else if(this.ActionForm1.value.CanalDiffusion.libelle =="TV") {
       
      }
      console.log(this.action);

    }
    
  }

step1(){
  
console.log(this.ActionForm2.value.TypeContenue)
  if(this.ActionForm1.valid)
  this.canal1=this.ActionForm1.value.CanalDiffusion.libelle
  this.isSubmitted1 = true;
  if(this.ActionForm1.value.CanalDiffusion.libelle== "SMS"){
    this.ActionForm2.get('SMSBody').setValidators(Validators.required);
    this.ActionForm2.get('SMSBody').updateValueAndValidity();
    this.ActionForm2.get('TypeContenue').clearValidators();
    this.ActionForm2.get('TypeContenue').updateValueAndValidity();
    this.ActionForm2.get('formataffichage').clearValidators();
    this.ActionForm2.get('formataffichage').updateValueAndValidity();
  }else if(this.ActionForm1.value.CanalDiffusion.libelle== "Mobile" || this.ActionForm1.value.CanalDiffusion.libelle== "TV"){
    this.ActionForm2.get('SMSBody').clearValidators();
          this.ActionForm2.get('SMSBody').updateValueAndValidity();
          this.ActionForm2.get('TypeContenue').setValidators(Validators.required);
          this.ActionForm2.get('TypeContenue').updateValueAndValidity();
          this.ActionForm2.get('formataffichage').setValidators(Validators.required);
          this.ActionForm2.get('formataffichage').updateValueAndValidity();
  }
}

step2(){
  if(this.file !=null){
    this.isSubmitted2 = true;
    this.ActionForm3.get('agemax').setValidators([Validators.required,Validators.min(this.ActionForm3.value.agemin)]);

  }
  
}
step3(){
  this.isSubmitted3 = true;
  if(this.ActionForm3.valid)
  this.submit();
}






  getAllSectors(id) {
    this._Categoriepubendpointservice.findAllCategoriePub(id).subscribe(response => {
      if (response.result == 1) {
        this.sectors = response.objectResponse;
        console.log(response.objectResponse)
      }
    });
  }



  ajouteractionavecmedia(action: ActionMarketing,populationCible:PopulationCible) {


    this._populationCibleService.CreatePopulationCible(populationCible).subscribe(result=>{
      action.idPopulationCible=result.objectResponse.idPopulationCible;

  this._Actionmarketingendpointservice.uplodeimage(this.file).subscribe(response => {
      if (response.result == 1) {
        action.idStorage = response.objectResponse.idStorage;
       

        this._Actionmarketingendpointservice.CreateActionMarketing(action).subscribe(val => {
          
          if (val.result == 1) {
            this._GlobalService.showToast("success", "success", "Action ajouté avec succès")
            this._router.navigateByUrl("pages/gestionpub/gestionactionmarketing");
          } else
            this._GlobalService.showToast("danger", "Erreur", val.errorDescription);
            this.disable=false;
        }
        )
      } else
        this._GlobalService.showToast("danger", "Erreur", response.errorDescription);
        this.disable=false;
    });
    })
  

  }
  ajouteraction(action: ActionMarketing,populationCible:PopulationCible) {

    this._populationCibleService.CreatePopulationCible(populationCible).subscribe(result=>{
      action.idPopulationCible=result.objectResponse.idPopulationCible;
      this._Actionmarketingendpointservice.CreateActionMarketing(action).subscribe(val => {
        if (val.result == 1) {
          this._GlobalService.showToast("success", "success", "Action ajouter avec succés")
          this._router.navigateByUrl("pages/gestionpub/gestionactionmarketing");
        } else
          this._GlobalService.showToast("danger", "Erreur", val.errorDescription);
          this.disable=false;
      }
      )

    })
    
  }

  select(event) {
this.file=event.files[0];
console.log(event.files[0])
if(this.file!=null){
  this.afficherimage=true;
}else
this.afficherimage=false;
  }


  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  retour(){
    this._router.navigateByUrl("pages/gestionpub/gestionactionmarketing");
  }
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
           
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }
}
