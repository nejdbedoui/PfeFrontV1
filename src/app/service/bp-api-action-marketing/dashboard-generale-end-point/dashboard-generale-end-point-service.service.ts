import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActionEnCoursDeDiffusionDTOResponse } from '../../../model/response/ActionEnCoursDeDiffusionDTOResponse';
import { DemandeDiffusionDTOResponse } from '../../../model/response/DemandeDiffusionDTOResponse';

@Injectable({
  providedIn: 'root'
})
export class DashboardGeneraleEndPointServiceService {

  
  constructor(private httpclient:HttpClient) { }
  
  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}
);



findAllActionEnCourDeDiffusionByIdPartenaire(idPartenaire:String){
  return this.httpclient.get<ActionEnCoursDeDiffusionDTOResponse>(environment.backend_url_Publicite+"findAllActionEnCourDeDiffusionByIdPartenaire/"+idPartenaire,{ headers: this.header }); 
}
findAllDemandeDiffusionDTOByIdPartenaire(idPartenaire:String){
  return this.httpclient.get<DemandeDiffusionDTOResponse>(environment.backend_url_Publicite+"findAllDemandeDiffusionDTOByIdPartenaire/"+idPartenaire,{ headers: this.header }); 
}
}
