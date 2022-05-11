import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActionMarketing } from '../../../model/ActionMarketing';
import { OneDetailsActionDTO } from '../../../model/response/OneDetailsActionDTO';

@Injectable({
  providedIn: 'root'
})
export class DetailsActionService {

  constructor(private httpclient:HttpClient) { }
  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}
);


findDetailsByAction(action:ActionMarketing){
  return this.httpclient.post<OneDetailsActionDTO>(environment.backend_url_Publicite+"findDetailsByAction/",action,{ headers: this.header });

}
}
