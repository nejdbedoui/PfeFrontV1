import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CanalDiffusion } from '../../../../../model/Canaldiffusion';
import { CanalDiffusionEndPointService } from '../../../../../service/bp-api-action-marketing/canal-diffusion-end-point/canal-diffusion-end-point.service';
import { GlobalServiceService } from '../../../../../service/GlobalService/global-service.service';

@Component({
  selector: 'ngx-create-canal-diffusion',
  templateUrl: './create-canal-diffusion.component.html',
  styleUrls: ['./create-canal-diffusion.component.scss']
})
export class CreateCanalDiffusionComponent implements OnInit {
  isSubmitted:boolean = false;
  constructor(private _FormBuilder: FormBuilder,private _router:Router,private _canalDiffusionService:CanalDiffusionEndPointService,private _GlobalService: GlobalServiceService) { }
  CanalForm: FormGroup;
  ngOnInit() {
    this.InstanciateForm();
  }

  InstanciateForm() {
    this.CanalForm = this._FormBuilder.group({ 
      libelle: ['', [Validators.required]],
      factif: ["0", [Validators.required]]
    });
  }

onSubmit(){
  this.isSubmitted = true;
  if (this.CanalForm.valid) {
  let canal:CanalDiffusion = new CanalDiffusion;
  canal.factif = this.CanalForm.value.factif;
  canal.libelle = this.CanalForm.value.libelle;

  this._canalDiffusionService.createCanal(canal).subscribe(response=>{
    if(response.result == 1){
      this._GlobalService.showToast("success", "success", "Canal ajouté avec succès")
            this._router.navigateByUrl("pages/gestionpub/gestionactionmarketingadmin/configuration");

    }
    else{
      this._GlobalService.showToast("danger", "Erreur", response.errorDescription);
    }
  })
  }

}

  get formControls1() { return this.CanalForm.controls; }

}

