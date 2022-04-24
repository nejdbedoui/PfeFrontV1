import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CategoriePub } from '../../../model/CategoriePub';
import { CategoriePubResponse } from '../../../model/response/CategoriePubResponse';
import { OneCategoriePubResponse } from '../../../model/response/OneCategoriePubResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoriePubEndPointServiceService {

  constructor(private httpclient:HttpClient) { }
  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}
);

CreateCategoriePub(CategoriePub:CategoriePub){
  return this.httpclient.post<OneCategoriePubResponse>(environment.backend_url_Publicite+"CreateCategorie/",CategoriePub,{ headers: this.header });

}

findByidCategoriePub(idCategoriePub:String){
  return this.httpclient.get<OneCategoriePubResponse>(environment.backend_url_Pos+"findByIdCategorie/"+idCategoriePub,{ headers: this.header }); 
}

findAllCategoriePub(){
  return this.httpclient.get<CategoriePubResponse>(environment.backend_url_Pos+"findAllCategorie/",{ headers: this.header }); 
}

deleteCategoriePub(idCategoriePub:String){
  return this.httpclient.delete<any>(environment.backend_url_Pos+"DeleteCategorie/"+idCategoriePub,{ headers: this.header });

}
updateCategoriePub(CategoriePub:CategoriePub){
  return this.httpclient.put<OneCategoriePubResponse>(environment.backend_url_Pos+"UpdateCategorie/",CategoriePub,{ headers: this.header });
}

}
