import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PointeVentePartenaireDTO } from '../../../../model/dto/PointeVentePartenaireDTO';
import { ParametreActionMarketing } from '../../../../model/ParametreActionMarketing';
import { PartenaireBprice } from '../../../../model/PartenaireBprice';
import { ParametreActionEndPointServiceService } from '../../../../service/bp-api-action-marketing/parametre-action-end-point/parametre-action-end-point-service.service';
import { PartenaireBpriceEndPointService } from '../../../../service/bp-api-pos/partenaire-bprice-end-point/partenaire-bprice-end-point.service';
import { GlobalServiceService } from '../../../../service/GlobalService/global-service.service';

@Component({
  selector: 'ngx-parametrage-action',
  templateUrl: './parametrage-action.component.html',
  styleUrls: ['./parametrage-action.component.scss']
})
export class ParametrageActionComponent implements OnInit {

  ListePartenaire:PartenaireBprice[];
  
  checkedpartners:ParametreAvecPrix[] = [];
  loading: boolean = true;
  idPartenaire:String;

  constructor(private _GlobalService: GlobalServiceService,private _router: Router,private _partenaireBPriceService:PartenaireBpriceEndPointService,private _parametreActionService:ParametreActionEndPointServiceService, private route: ActivatedRoute) { 
  }
idAction:String;
idUser:String;
  ngOnInit() {
    this.idPartenaire =localStorage.getItem("partenaireid");
    this.idUser =localStorage.getItem("UserId");
    this.idAction = this.route.snapshot.paramMap.get('id');
    this.getAllPartenaireBPrice();


  }
SendtoPartner(parametreAvecPrix:ParametreAvecPrix){
  if(parametreAvecPrix.partenaire.statut==0){
  let parametre:ParametreActionMarketing = new ParametreActionMarketing()
  parametre.dateCreation= new Date();
  parametre.idActionMarketing = this.idAction;
  parametre.idPartenaireCible = parametreAvecPrix.partenaire.idPartenaire;
  parametre.idUtilisateur = this.idUser;
  parametre.prix = parametreAvecPrix.prix;
  parametre.statut = 1;
  console.log(parametre);
    this._parametreActionService.CreateParametreActionMarketing(parametre).subscribe(response=>{
      if(response.result==1){
        if (response.result == 1) {
          console.log(response)
          this._GlobalService.showToast("success", "success", "Paramètre envoyée avec succès")
        } else
          this._GlobalService.showToast("danger", "Erreur", response.errorDescription)
    
      }
    });
  }
  else{
    this._GlobalService.showToast("danger", "Erreur","No.")
  }
  
}
  getAllPartenaireBPrice(){
    console.log(this.idAction)
    this._partenaireBPriceService.findAllWithPointVentesByFActifDTO(1,this.idAction).subscribe(response=>{
      if(response.result==1){
        this.loading = false;
        console.log(response)
        response.objectResponse.filter(value=>{
          let cp:ParametreAvecPrix = new ParametreAvecPrix();
          cp.partenaire = value;
          if(cp.partenaire.prix!=null){
            cp.prix=cp.partenaire.prix;
          }
          this.checkedpartners.push(cp);
          
        })
        this.loading= false;
      }
      else{
        this.loading = false;
      }
    });
  }

}
export class ParametreAvecPrix {
 partenaire:PointeVentePartenaireDTO;
 prix:number;
}
