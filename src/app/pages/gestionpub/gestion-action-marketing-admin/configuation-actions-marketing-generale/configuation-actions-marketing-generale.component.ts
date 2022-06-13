import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanalDiffusion } from '../../../../model/Canaldiffusion';
import { FormatAffichage } from '../../../../model/FormatAffichage';
import { PopulationCible } from '../../../../model/PopulationCible';
import { TypeAffichage } from '../../../../model/TypeAffichage';
import { CanalDiffusionEndPointService } from '../../../../service/bp-api-action-marketing/canal-diffusion-end-point/canal-diffusion-end-point.service';
import { FormatAffichageEndPointService } from '../../../../service/bp-api-action-marketing/format-affichage-end-point/format-affichage-end-point.service';
import { PopulationCibleEndPointServiceService } from '../../../../service/bp-api-action-marketing/population-cible-end-point/population-cible-end-point-service.service';
import { TypeAffichageEndPointServiceService } from '../../../../service/bp-api-action-marketing/type-affichage-end-point/type-affichage-end-point-service.service';

@Component({
  selector: 'ngx-configuation-actions-marketing-generale',
  templateUrl: './configuation-actions-marketing-generale.component.html',
  styleUrls: ['./configuation-actions-marketing-generale.component.scss']
})
export class ConfiguationActionsMarketingGeneraleComponent implements OnInit {
  formatsAffichages:FormatAffichage[];
  canauxDiffusions:CanalDiffusion[];
  populationsCibles:PopulationCible[];
  typesAffichages:TypeAffichage[];
  loading: boolean=false;

  constructor(private _typeAffichage:TypeAffichageEndPointServiceService, private route: Router ,private _populationCibleService:PopulationCibleEndPointServiceService,private _formatAffichageService:FormatAffichageEndPointService,private _canalDiffusionService:CanalDiffusionEndPointService) { }

  ngOnInit() {
  }
getData(event){

  switch (event.tabId) {
    case "canaldiffusion":
      if(!this.canauxDiffusions)
      this.getCanauxDiffusionData();
      break;


    case "populationCible":
      if(!this.populationsCibles)
      this.getPopulationCiblesData();
    break;

    case "formatsAffichages":
      if(!this.formatsAffichages)
      this.getFormatsAffichageData();
    break;

    case "typeAffichage":
      if(!this.typesAffichages)
      this.getTypeAffichageData();
      break;
    default:
      break;
  }

}
ChangeStatusCan(Canal:CanalDiffusion){
 let backup = Canal.factif;
  if(Canal.factif==0){
    Canal.factif=1;
  }else{
    Canal.factif=0;
  }
  this._canalDiffusionService.updateCanal(Canal).subscribe(response=>{
    if (response.result !=1){
      Canal.factif=backup;
    }
  })
}
ChangeStatusPop(Population:PopulationCible){
  let backup = Population.factif;
   if(Population.factif==0){
    Population.factif=1;
   }else{
    Population.factif=0;
   }
   this._populationCibleService.updatePopulationCible(Population).subscribe(response=>{
     if (response.result !=1){
      Population.factif=backup;
     }
   })
 }
ChangeStatusForm(Format:FormatAffichage){
  let backup = Format.factif;
  if(Format.factif==0){
    Format.factif=1;
  }else{
    Format.factif=0;
  }
  this._formatAffichageService.updateformat(Format).subscribe(response=>{
    if (response.result !=1){
      Format.factif=backup;
    }
  })
}
ChangeStatusType(TypeAffichage:TypeAffichage){
  let backup = TypeAffichage.factif;
  if(TypeAffichage.factif==0){
    TypeAffichage.factif=1;
  }else{
    TypeAffichage.factif=0;
  }
  this._typeAffichage.updateTypeAffichage(TypeAffichage).subscribe(response=>{
    console.log(response)
    if (response.result !=1){
      TypeAffichage.factif=backup;
      console.log(response)
    }
  })
}
DeleteCanalDiff(Canal:CanalDiffusion){
  this._canalDiffusionService.deleteCanal(Canal.idCanaldiffusion).subscribe(response=>{
    if (response.result==1){
      this.canauxDiffusions = this.canauxDiffusions.filter(val=>val.idCanaldiffusion!=Canal.idCanaldiffusion);
    }
  });
}
DeleteFormatAffichage(Format:FormatAffichage){
  this._formatAffichageService.deleteformat(Format.idFormatAffichage).subscribe(response=>{
    if (response.result==1){
      this.formatsAffichages = this.formatsAffichages.filter(val=>val.idFormatAffichage!=Format.idFormatAffichage);
    }
  });
}
DeletePopulationCible(population:PopulationCible){
  this._populationCibleService.deletePopulationCible(population.idPopulationCible).subscribe(response=>{
    if (response.result==1){
      this.populationsCibles = this.populationsCibles.filter(val=>val.idPopulationCible!=population.idPopulationCible);
    }
  });
}
DeleteTypeAffichage(TypeAffichage:TypeAffichage){
  this._typeAffichage.deleteTypeAffichage(TypeAffichage.idTypeAffichage).subscribe(response=>{
    if (response.result==1){
      this.typesAffichages = this.typesAffichages.filter(val=>val.idTypeAffichage!=TypeAffichage.idTypeAffichage);
    }
  });
}
getCanauxDiffusionData(){
  this.loading = true;
  this._canalDiffusionService.findAllCanal().subscribe(val=>
    {
      if(val.result==1){
        this.canauxDiffusions=val.objectResponse;
        this.loading = false;
        console.log(this.canauxDiffusions)
      }
      else{
        this.loading= false;
      }
    }
    )
  }

  getFormatsAffichageData(){
    this.loading = true;
    this._formatAffichageService.findAllformat().subscribe(val=>
      {
        if(val.result==1){
          this.formatsAffichages=val.objectResponse;
          this.loading = false;
          console.log(this.formatsAffichages)
        }
        else{
          this.loading= false;
        }
      }
      )
  }
  getPopulationCiblesData(){
    this._populationCibleService.findAllPopulationCible().subscribe(val=>
      {
        if(val.result==1){
          this.populationsCibles=val.objectResponse;
          this.loading = false;
          console.log(this.populationsCibles)
        }
        else{
          this.loading= false;
        }
      }
      )

  }
  getTypeAffichageData(){
    this._typeAffichage.findAllTypeAffichage().subscribe(val=>
      {
        if(val.result==1){
          this.typesAffichages=val.objectResponse;
          this.loading = false;
          console.log(this.typesAffichages)
        }
        else{
          this.loading= false;
        }
      }
      )

  }
  getStatus(factif){
    switch (factif) {
      case 0:
        return "Désactivée"
      case 1:
        return "Activée"
      default:
        break;
    }
  }
  getSexe(Sexe){
    switch (Sexe) {
      case 0:
        return "Homme / Femme"
      case 1:
        return "Homme"
        case 2:
        return "Femme"
      default:
        break;
    }
  }
  ajoutercanal() {
    this.route.navigateByUrl("/pages/gestionpub/gestionactionmarketingadmin/configuration/ajoutercanal");
  }
  ajouterTypeAffichage(){
    this.route.navigateByUrl("/pages/gestionpub/gestionactionmarketingadmin/configuration/ajouterTypeAffichage");

  }
}
