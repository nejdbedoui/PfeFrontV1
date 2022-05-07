import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { OneSectorResponse } from '../../../model/response/OneSectorResponse';
import { SectorResponse } from '../../../model/response/SectorResponse';
import { Sector } from '../../../model/Sector';

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

CreateCategoriePub(CategoriePub:Sector){
  return this.httpclient.post<OneSectorResponse>(environment.backend_url_Publicite+"CreateCategorie/",CategoriePub,{ headers: this.header });

}

findByidCategorie(idCategoriePub:String){
  return this.httpclient.get<OneSectorResponse>(environment.backend_url_Publicite+"findByIdCategorie/"+idCategoriePub,{ headers: this.header }); 
}

findAllCategoriePub(id){
  return this.httpclient.get<SectorResponse>(environment.backend_url_Publicite+"findAllCategorieExept/"+id,{ headers: this.header }); 
}

deleteCategoriePub(idCategoriePub:String){
  return this.httpclient.delete<any>(environment.backend_url_Publicite+"DeleteCategorie/"+idCategoriePub,{ headers: this.header });

}
updateCategoriePub(CategoriePub:Sector){
  return this.httpclient.put<OneSectorResponse>(environment.backend_url_Publicite+"UpdateCategorie/",CategoriePub,{ headers: this.header });
}

}
