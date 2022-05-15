import { Component, OnInit } from '@angular/core';
import { Contrat } from '../../../../model/Contrat';
import { ContractEndPointServiceService } from '../../../../service/bp-api-action-marketing/contrat-end-point/contract-end-point-service.service';
import { GlobalServiceService } from '../../../../service/GlobalService/global-service.service';

@Component({
  selector: 'ngx-gestion-contract',
  templateUrl: './gestion-contract.component.html',
  styleUrls: ['./gestion-contract.component.scss']
})
export class GestionContractComponent implements OnInit {

  constructor(private _contratServiceEndPoint:ContractEndPointServiceService,  private _GlobalService: GlobalServiceService) { }
partenaire:String;
ListeContrat:Contrat[];
affichefilter:boolean = false;
loading:boolean = true;
  ngOnInit() {
    this.partenaire = localStorage.getItem('partenaireid');
    this.getAllContract();
  }

  getStatusContrat(stat:number){
    if(stat==0)
    return "Crée"
    else if(stat==1)
    return "Accepté"
    else if(stat==2)
    return "Refusé"
  }

getAllContract(){
this._contratServiceEndPoint.findAllContratActionMarketingByPartenaireId(this.partenaire).subscribe(response=>{
  if(response.result==1){
    this.loading = false;
    this.ListeContrat = response.objectResponse;
    console.log(this.ListeContrat)
  }
});
}

GestionContrat(contrat:Contrat,statut:number){
contrat.statutContrat = statut;
this._contratServiceEndPoint.UpdateContrat(contrat).subscribe(response=>{
  console.log(response)

if(response.result==1){
  this._GlobalService.showToast("success", "success", "Contrat modifier avec succés")
}
else{

}});
}

}
