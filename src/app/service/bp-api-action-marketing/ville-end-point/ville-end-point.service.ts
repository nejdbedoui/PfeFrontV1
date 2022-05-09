import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { OneVilleResponse } from '../../../model/response/OneVilleResponse';
import { VilleResponse } from '../../../model/response/VilleResponse';
import { Ville } from '../../../model/Ville';

@Injectable({
  providedIn: 'root'
})
export class VilleEndPointService {
  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}
);

  constructor(private httpclient:HttpClient) { }

  createCanal(ville:Ville){
    return this.httpclient.post<OneVilleResponse>(environment.backend_url_Publicite+"createVille/",ville,{ headers: this.header });
  }
  
  deleteCanal(idville:String){
    return this.httpclient.delete<any>(environment.backend_url_Publicite+"deleteVille/"+idville,{ headers: this.header });
  }
  
  updateCanal(ville:Ville){
    return this.httpclient.put<OneVilleResponse>(environment.backend_url_Publicite+"updateVille/",ville,{ headers: this.header });
  }
  
  
  findAllCanal(){
    return this.httpclient.get<VilleResponse>(environment.backend_url_Publicite+"findAllVille/",{ headers: this.header }); 
  }
  
  findAllActiveCanal(){
    return this.httpclient.get<VilleResponse>(environment.backend_url_Publicite+"findAllActiveVille/",{ headers: this.header }); 
  }



}
