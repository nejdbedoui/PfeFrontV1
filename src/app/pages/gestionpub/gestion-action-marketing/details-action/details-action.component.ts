import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionMarketing } from '../../../../model/ActionMarketing';
import { CategoriePub } from '../../../../model/CategoriePub';
import { PartenaireBprice } from '../../../../model/PartenaireBprice';
import { ActionMarketingEndPointServiceService } from '../../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { CategoriePubEndPointServiceService } from '../../../../service/bp-api-action-marketing/categorie-pub-end-point/categorie-pub-end-point-service.service';
import { PartenaireBpriceEndPointService } from '../../../../service/bp-api-pos/partenaire-bprice-end-point/partenaire-bprice-end-point.service';


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

  constructor(private _Categoriepubendpointservice: CategoriePubEndPointServiceService,private _actionMarketingService:ActionMarketingEndPointServiceService,private route:ActivatedRoute,private _partenaireservice:PartenaireBpriceEndPointService) { }

  ngOnInit() {
    
   


    this._actionMarketingService.findByidActionMarketing(this.route.snapshot.paramMap.get('id')).subscribe(val1=>
      {
        if(val1.result==1)
       { this.action=val1.objectResponse
       


        this._partenaireservice.findByIdPartenaire(val1.objectResponse.idPartenaire).subscribe(val2=>
          {
            if(val2.result==1){
              this.partenair=val2.objectResponse
            }})


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
}
