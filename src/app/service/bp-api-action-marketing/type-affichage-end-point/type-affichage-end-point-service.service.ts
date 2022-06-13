import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TypeAffichage } from '../../../model/TypeAffichage';
import { OneTypeAffichageResponse } from '../../../model/response/OneTypeAffichageResponse';
import { TypeAffichageResponse } from '../../../model/response/TypeAffichageResponse';

@Injectable({
  providedIn: 'root'
})
export class TypeAffichageEndPointServiceService {

  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}
);

  constructor(private httpclient:HttpClient) { }

  CreateTypeAffichage(typeAffichage:TypeAffichage){
    console.log(typeAffichage)
    return this.httpclient.post<OneTypeAffichageResponse>(environment.backend_url_Publicite+"createTypeAffichage/",typeAffichage,{ headers: this.header });
  
  }
  
  findByidTypeAffichage(idTypeAffichage:String){
    return this.httpclient.get<OneTypeAffichageResponse>(environment.backend_url_Publicite+"findByIdTypeAffichage/"+idTypeAffichage,{ headers: this.header }); 
  }
  
  findAllTypeAffichage(){
    return this.httpclient.get<TypeAffichageResponse>(environment.backend_url_Publicite+"findAllTypeAffichage/",{ headers: this.header }); 
  }
  findAllActiveTypeAffichage(){
    return this.httpclient.get<TypeAffichageResponse>(environment.backend_url_Publicite+"findAllActiveTypeAffichage/",{ headers: this.header }); 
  }
  
  deleteTypeAffichage(idTypeAffichage:String){
    return this.httpclient.delete<any>(environment.backend_url_Publicite+"deleteTypeAffichage/"+idTypeAffichage,{ headers: this.header });
  
  }
  updateTypeAffichage(typeAffichage:TypeAffichage){
    return this.httpclient.put<OneTypeAffichageResponse>(environment.backend_url_Publicite+"updateTypeAffichage/",typeAffichage,{ headers: this.header });
  }
}
