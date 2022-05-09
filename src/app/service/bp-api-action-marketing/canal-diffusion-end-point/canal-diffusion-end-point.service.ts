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

deleteCanal(idformataffichage:String){
  return this.httpclient.delete<any>(environment.backend_url_Publicite+"deleteCanal/"+idformataffichage,{ headers: this.header });
}

updateCanal(formataffichage:CanalDiffusion){
  return this.httpclient.put<OneCanalDiffusionResponse>(environment.backend_url_Publicite+"updateCanal/",formataffichage,{ headers: this.header });
}


findAllCanal(){
  return this.httpclient.get<CanalDiffusionResponse>(environment.backend_url_Publicite+"findAllCanal/",{ headers: this.header }); 
}

findAllActiveCanal(){
  return this.httpclient.get<CanalDiffusionResponse>(environment.backend_url_Publicite+"findAllActiveCanal/",{ headers: this.header }); 
}
}
