import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CanalDiffusion } from '../../../model/Canaldiffusion';
import { CanalDiffusionResponse } from '../../../model/response/CanalDiffusionResponse';
import { OneCanalDiffusionResponse } from '../../../model/response/OneCanalDiffusionResponse';

@Injectable({
  providedIn: 'root'
})
export class CanalDiffusionEndPointService {

  constructor(private httpclient:HttpClient) { }
  
  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}
);

createCanal(canaldiffusion:CanalDiffusion){
  return this.httpclient.post<OneCanalDiffusionResponse>(environment.backend_url_Publicite+"createCanal/",canaldiffusion,{ headers: this.header });
}

deleteCanal(idCanalDiffusion:String){
  return this.httpclient.delete<any>(environment.backend_url_Publicite+"deleteCanal/"+idCanalDiffusion,{ headers: this.header });
}

updateCanal(CanalDiffusion:CanalDiffusion){
  return this.httpclient.put<OneCanalDiffusionResponse>(environment.backend_url_Publicite+"updateCanal/",CanalDiffusion,{ headers: this.header });
}


findAllCanal(){
  return this.httpclient.get<CanalDiffusionResponse>(environment.backend_url_Publicite+"findAllCanal/",{ headers: this.header }); 
}

findAllActiveCanal(){
  return this.httpclient.get<CanalDiffusionResponse>(environment.backend_url_Publicite+"findAllActiveCanal/",{ headers: this.header }); 
}
findCanalByLibelle(libelle:String){
  return this.httpclient.get<OneCanalDiffusionResponse>(environment.backend_url_Publicite+"findCanalByLibelle/"+libelle,{ headers: this.header }); 

}
}
