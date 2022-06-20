import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HistoriqueInteractionActionResponse } from '../../../model/response/HistoriqueInteractionActionResponse';
import { ParametreActionMarketingResponse } from '../../../model/response/ParametreActionMarketingResponse';



@Injectable({
  providedIn: 'root'
})
export class HistoriqueInteractionEndPointServiceService {

  constructor(private httpclient:HttpClient) { }
  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}



);

findAllHistorique(idActionMarketing:String){
  return this.httpclient.get<HistoriqueInteractionActionResponse>(environment.backend_url_Publicite+"findAllHistoriqueByIdActionMarketing/"+idActionMarketing,{ headers: this.header }); 
}
}
