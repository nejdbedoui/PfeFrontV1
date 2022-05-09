import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { formataffichage } from '../../../model/FormatAffichage';
import { FormataffichageResponse } from '../../../model/response/FormataffichageResponse';
import { OneFormataffichageResponse } from '../../../model/response/OneFormataffichageResponse';

@Injectable({
  providedIn: 'root'
})
export class FormatAffichageEndPointService {

  constructor(private httpclient:HttpClient) { }
  
  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}



);

createformat(formataffichage:formataffichage){
  return this.httpclient.post<OneFormataffichageResponse>(environment.backend_url_Publicite+"createformat/",formataffichage,{ headers: this.header });
}

deleteformat(idformataffichage:String){
  return this.httpclient.delete<any>(environment.backend_url_Publicite+"deleteformat/"+idformataffichage,{ headers: this.header });
}

updateformat(formataffichage:formataffichage){
  return this.httpclient.put<OneFormataffichageResponse>(environment.backend_url_Publicite+"updateformat/",formataffichage,{ headers: this.header });
}


findAllformat(){
  return this.httpclient.get<FormataffichageResponse>(environment.backend_url_Publicite+"findAllformat/",{ headers: this.header }); 
}

findAllActiveformat(id:string){
  return this.httpclient.get<FormataffichageResponse>(environment.backend_url_Publicite+"findAllActiveformat/"+id,{ headers: this.header }); 
}

}
