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
  
  checkedpartners:CheckedPartners[] = [];
  loading: boolean = true;
  idPartenaire:String;

  constructor(private _GlobalService: GlobalServiceService,private _router: Router,private _partenaireBPriceService:PartenaireBpriceEndPointService,private _parametreActionService:ParametreActionEndPointServiceService, private route: ActivatedRoute) { 

  }
idAction:String;
  ngOnInit() {
    this.idPartenaire =localStorage.getItem("partenaireid");
    this.getAllPartenaireBPrice();
     this.idAction = this.route.snapshot.paramMap.get('id');

  }

  getAllPartenaireBPrice(){
    this._partenaireBPriceService.findAllWithPointVentesByFActifDTO(1,"6051af0a33c276f08d303946").subscribe(response=>{
      console.log(console.log(response))
 
      if(response.result==1){
        this.loading = false;
        response.objectResponse.filter(value=>{
          let cp:CheckedPartners = new CheckedPartners();
          cp.partenaire = value;
          cp.checked = false;
          this.checkedpartners.push(cp);
          
        })
        console.log(this.checkedpartners)
        this.loading= false;
      }
      else{
        this.loading = false;
      }
    });
  }

OnSubmit(){
  let parametre:ParametreActionMarketing = new ParametreActionMarketing();
  parametre.listeidPartenaire=[];
  this.checkedpartners.forEach(value=>{
    if(value.checked){
      parametre.listeidPartenaire.push(value.partenaire.idPartenaire);
    }
  })
  if(parametre.listeidPartenaire.length>0){
    this._parametreActionService.CreateParametreActionMarketing(parametre,this.idAction).subscribe(response=>{
      if(response.result==1){
        if (response.result == 1) {
          this._GlobalService.showToast("success", "success", "Action paramétrée avec succès")
          this._router.navigateByUrl("pages/gestionpub/gestionactionmarketingadmin");
        } else
          this._GlobalService.showToast("danger", "Erreur", response.errorDescription)
    
      }
    });
  }
}
}
export class CheckedPartners {
 partenaire:PointeVentePartenaireDTO;
 checked:boolean;
}
