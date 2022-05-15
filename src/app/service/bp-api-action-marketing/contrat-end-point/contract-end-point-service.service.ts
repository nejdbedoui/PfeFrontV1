import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Contrat } from '../../../model/Contrat';
import { ContratResponse } from '../../../model/response/ContratResponse';
import { OneContratResponse } from '../../../model/response/OneContratResponse';

@Injectable({
  providedIn: 'root'
})
export class ContractEndPointServiceService {

  constructor(private httpclient:HttpClient) { }
  
  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}
);

findByidContrat(idContrat:String){
  return this.httpclient.get<OneContratResponse>(environment.backend_url_Publicite+"findByIdContrat/"+idContrat,{ headers: this.header }); 
}

findAllContrat(){
  return this.httpclient.get<ContratResponse>(environment.backend_url_Publicite+"findAllContratActionMarketing/",{ headers: this.header }); 
}
findAllContratActionMarketingByPartenaireId(idPartenaire:String){
  return this.httpclient.get<ContratResponse>(environment.backend_url_Publicite+"findAllContratActionMarketingByPartenaireId/"+idPartenaire,{ headers: this.header }); 
}
UpdateContrat(contrat:Contrat){
  return this.httpclient.post<OneContratResponse>(environment.backend_url_Publicite+"UpdateContratActionMarketing/",contrat,{ headers: this.header }); 

}
  }