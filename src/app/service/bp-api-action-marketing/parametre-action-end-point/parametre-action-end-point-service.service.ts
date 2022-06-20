import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ParametreActionMarketing } from '../../../model/ParametreActionMarketing';
import { OneParametreActionMarketingResponse } from '../../../model/response/OneParametreActionMarketingResponse';
import { ParametreActionMarketingResponse } from '../../../model/response/ParametreActionMarketingResponse';

@Injectable({
  providedIn: 'root'
})
export class ParametreActionEndPointServiceService {
  this: any;

  constructor(private httpclient:HttpClient) { }

  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}



);
CreateParametreActionMarketing(ParametreAction:ParametreActionMarketing){
  return this.httpclient.post<OneParametreActionMarketingResponse>(environment.backend_url_Publicite+"CreateParametreActionMarketing/",ParametreAction,{ headers: this.header });

}
findAllParametreActionMarketing(){
  return this.httpclient.get<ParametreActionMarketingResponse>(environment.backend_url_Publicite+"findAllParametreActionMarketing/",{ headers: this.header }); 
}
updateParametre(parametre:ParametreActionMarketing){
  return this.httpclient.put<OneParametreActionMarketingResponse>(environment.backend_url_Publicite+"UpdateParametreActionMarketing/",parametre,{ headers: this.header });
}
findByiIdParametreActionMarketing(idParametre){
  return this.httpclient.get<OneParametreActionMarketingResponse>(environment.backend_url_Publicite+"findByIdParametreActionMarketing/"+idParametre,{ headers: this.header }); 
}
findAccepteeByiIActionMarketing(idAction){
  return this.httpclient.get<ParametreActionMarketingResponse>(environment.backend_url_Publicite+"findAllByIdActionMarketingAndStatut/"+idAction,{ headers: this.header }); 
}

}
