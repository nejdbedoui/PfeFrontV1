import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeAffichage } from '../../../../../model/TypeAffichage';
import { TypeAffichageEndPointServiceService } from '../../../../../service/bp-api-action-marketing/type-affichage-end-point/type-affichage-end-point-service.service';
import { GlobalServiceService } from '../../../../../service/GlobalService/global-service.service';

@Component({
  selector: 'ngx-create-type-affichage',
  templateUrl: './create-type-affichage.component.html',
  styleUrls: ['./create-type-affichage.component.scss']
})
export class CreateTypeAffichageComponent implements OnInit {

  constructor(private _GlobalService: GlobalServiceService,private _FormBuilder: FormBuilder,private _router:Router, private _typeAffichageService:TypeAffichageEndPointServiceService,) { }
  TypeAffichageForm: FormGroup;
  isSubmitted:boolean = false;
  ngOnInit() {
    this.InstanciateForm();
  }
  InstanciateForm() {
    this.TypeAffichageForm = this._FormBuilder.group({ 
      libelle: ['', [Validators.required]],
      factif: ["0", [Validators.required]]
    });
  }

  onSubmit(){
    this.isSubmitted = true;
    if (this.TypeAffichageForm.valid) {
    let typeAffichage:TypeAffichage = new TypeAffichage;
    typeAffichage.factif = this.TypeAffichageForm.value.factif;
    typeAffichage.libelle = this.TypeAffichageForm.value.libelle;
  
    this._typeAffichageService.CreateTypeAffichage(typeAffichage).subscribe(response=>{
      if(response.result == 1){
        this._GlobalService.showToast("success", "success", "Type d'affichage ajouté avec succès")
              this._router.navigateByUrl("pages/gestionpub/gestionactionmarketingadmin/configuration");
  
      }
      else{
        this._GlobalService.showToast("danger", "Erreur", response.errorDescription);
      }
    })
    }
  
  }
  
    get formControls1() { return this.TypeAffichageForm.controls; }
}
