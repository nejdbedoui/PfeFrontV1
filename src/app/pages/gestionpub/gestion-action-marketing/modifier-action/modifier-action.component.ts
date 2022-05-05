import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActionMarketing } from '../../../../model/ActionMarketing';
import { CategoriePub } from '../../../../model/Categoriepub';
import { PopulationCible } from '../../../../model/PopulationCible';
import { ActionMarketingEndPointServiceService } from '../../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { CategoriePubEndPointServiceService } from '../../../../service/bp-api-action-marketing/categorie-pub-end-point/categorie-pub-end-point-service.service';
import { PopulationCibleEndPointServiceService } from '../../../../service/bp-api-action-marketing/population-cible-end-point/population-cible-end-point-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-modifier-action',
  templateUrl: './modifier-action.component.html',
  styleUrls: ['./modifier-action.component.scss']
})
export class ModifierActionComponent implements OnInit {

 
  isSubmitted: boolean = false;
  ActionForm: FormGroup;
  sector: string;
  optionContenue: any[];
  optionCanalDiffusion: any[];
  banner: boolean = false;
  popup: boolean = false;
  notification: boolean = false;
  sectors: CategoriePub[];
  action: ActionMarketing;
  categorie: CategoriePub;
  uploadedFiles: any[] = [];
  populationCible: PopulationCible;
  id: string = localStorage.getItem("partenaireid");
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;


  constructor(private _FormBuilder: FormBuilder, private _populationCibleService: PopulationCibleEndPointServiceService, private _Actionmarketingendpointservice: ActionMarketingEndPointServiceService, private _Categoriepubendpointservice: CategoriePubEndPointServiceService) {
    this.optionCanalDiffusion = [{ label: 'Mobile', value: 'mobile' }, { label: 'SMS', value: 'sms' }, { label: 'TV', value: 'tv' }];
    this.optionContenue = [{ label: 'Image', value: 'image' }, { label: 'Video', value: 'video' }];
  }



  ngOnInit() {
    this.getAllSectors();
    this.InstanciateForm();
    this.getAllSectors();

    //
  }


  checks = [
    { Libelle: "Pop Up", value: 0 },
    { Libelle: "Notification", value: 0 },
    { Libelle: "Banner", value: 0 }
  ];
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
      Atatchement: [null, [Validators.required]],
      SMSBody: ['', []],
      TypeContenue: [null, []],
      Frequence:[null, [Validators.required]]


    });
    this.ActionForm.get('CanalDiffusion').setValue("");
    this.ActionForm.get('CanalDiffusion').valueChanges
      .subscribe(value => {
        console.log(value);
        if (value.value == 'SMS') {
          this.ActionForm.get('SMSBody').setValidators(Validators.required);
          this.ActionForm.get('TypeContenue').setValidators(null);
          this.ActionForm.get('myChoices').setValidators(null);
        } else {
          this.ActionForm.get('SMSBody').setValidators(null);
          this.ActionForm.get('TypeContenue').setValidators(Validators.required);
          this.ActionForm.get('myChoices').setValidators(Validators.required);
        }
      });
  }

  get formControls() { return this.ActionForm.controls; }


   submit() {
    this.isSubmitted = !this.isSubmitted;

    this.categorie = new CategoriePub();
    this.categorie.libelle = this.sector;
    this.action = new ActionMarketing();


    // var response = await this.CreatePopulationCible(this.populationCible).toPromise();
    // if (response.result == 1) {
    //   this.action.idPopulationCible = response.objectResponse.idPopulationCible;
    // }

    console.log(this.categorie)
    this.action.idPartenaire = this.id;
    this.action.idCategorie = this.ActionForm.value.SecteurActivite;
    this.action.titre=this.ActionForm.value.titre;
    this.action.description = this.ActionForm.value.Description;
    this.action.dateDebut = this.ActionForm.value.dateDebutPub;
    this.action.dateFin = this.ActionForm.value.dateFinPub;
    this.action.dateCreation = new Date();
    this.action.url = this.ActionForm.value.LienPub;
    this.action.frequence=this.ActionForm.value.Frequence;
    this.action.libelleCanalDiffusion=this.ActionForm.value.CanalDiffusion ;
    
    if (this.ActionForm.value.CanalDiffusion =="sms") {
      this.action.smsBody = this.ActionForm.value.SMSBody;
    //  this.ajouteraction(this.action);
    } else if (this.ActionForm.value.CanalDiffusion =="mobile") {
      this.action.urlContenue = ["https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg"];
      
      this.action.typeAffichageMobile = this.ActionForm.value.myChoices;
      this.action.typeContenue=this.ActionForm.value.TypeContenue;
      
     
     // this.ajouteraction(this.action);
    } else {
      this.action.urlContenue = ["https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg"];
    //  this.ajouteraction(this.action);
    }
    console.log(this.action);
  }


  onCheckChange(event:any,index:number) {
    const formArray: FormArray = this.ActionForm.get('myChoices') as FormArray;
  
    

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




  test() {
    this.isSubmitted = !this.isSubmitted;
    console.log(this.ActionForm)
    console.log(this.ActionForm.value.myChoices)
    console.log(this.action)
  }


  tests(event) {
    console.log(event)
  }



  getAllSectors() {
    this._Categoriepubendpointservice.findAllCategoriePub().subscribe(response => {
      if (response.result == 1) {
        this.sectors = response.objectResponse;

      }
    });
  }


  CreatePopulationCible(populationCible: PopulationCible) {
    return this._populationCibleService.CreatePopulationCible(populationCible);
  }


  ajouteraction(action: ActionMarketing) {
    console.log(action);
    this._Actionmarketingendpointservice.CreateActionMarketing(action).subscribe(val =>
      console.log(val)
    )
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
            // this.previewImagePath = imgBase64Path;
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
