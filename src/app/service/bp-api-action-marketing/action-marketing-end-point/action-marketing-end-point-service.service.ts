import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActionMarketing } from '../../../model/ActionMarketing';
import { ActionMarketingResponse } from '../../../model/response/ActionMarketingResponse';
import { OneActionMarketingResponse } from '../../../model/response/OneActionMarketingResponse';

@Injectable({
  providedIn: 'root'
})
export class ActionMarketingEndPointServiceService {

  constructor(private httpclient:HttpClient) { }
  
  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}
);

CreateActionMarketing(Action:ActionMarketing){
  return this.httpclient.post<OneActionMarketingResponse>(environment.backend_url_Publicite+"CreateActionMarketing/",Action,{ headers: this.header });

}
findByidPartenaireAllActionMarketing(idPartenaire:String){
  return this.httpclient.get<ActionMarketingResponse>(environment.backend_url_Publicite+"findAllByIdPartenaire/"+idPartenaire,{ headers: this.header }); 

}

findByidActionMarketing(idAction:String){
  return this.httpclient.get<OneActionMarketingResponse>(environment.backend_url_Publicite+"findByIdActionMarketing/"+idAction,{ headers: this.header }); 
}

findAllActionMarketing(){
  return this.httpclient.get<ActionMarketingResponse>(environment.backend_url_Publicite+"findAllActionMarketing/",{ headers: this.header }); 
}

deleteActionMarketing(idAction:String){
  return this.httpclient.delete<any>(environment.backend_url_Publicite+"DeleteActionMarketing/"+idAction,{ headers: this.header });

}
updateActionMarketing(Action:ActionMarketing){
  return this.httpclient.put<OneActionMarketingResponse>(environment.backend_url_Publicite+"UpdateActionMarketing/",Action,{ headers: this.header });
}


}
