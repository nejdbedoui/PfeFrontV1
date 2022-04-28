import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PopulationCible } from '../../../model/PopulationCible';
import { OnePopulationCibleResponse } from '../../../model/response/OnePopulationCibleResponse';
import { PopulationCibleResponse } from '../../../model/response/PopulationCibleResponse';

@Injectable({
  providedIn: 'root'
})
export class PopulationCibleEndPointServiceService {

  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}
);

  constructor(private httpclient:HttpClient) { }

  CreatePopulationCible(populationCible:PopulationCible){
    return this.httpclient.post<OnePopulationCibleResponse>(environment.backend_url_Publicite+"CreatePopulationCible/",populationCible,{ headers: this.header });
  
  }
  
  findByidPopulationCible(idPopulationCible:String){
    return this.httpclient.get<OnePopulationCibleResponse>(environment.backend_url_Publicite+"findByIdPopulationCible/"+idPopulationCible,{ headers: this.header }); 
  }
  
  findAllPopulationCible(){
    return this.httpclient.get<PopulationCibleResponse>(environment.backend_url_Publicite+"findAllPopulationCible/",{ headers: this.header }); 
  }
  
  deletePopulationCible(idPopulationCible:String){
    return this.httpclient.delete<any>(environment.backend_url_Publicite+"DeletePopulationCible/"+idPopulationCible,{ headers: this.header });
  
  }
  updatePopulationCible(populationCible:PopulationCible){
    return this.httpclient.put<OnePopulationCibleResponse>(environment.backend_url_Publicite+"UpdatePopulationCible/",populationCible,{ headers: this.header });
  }
  
}
