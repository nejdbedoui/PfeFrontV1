import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActionMarketing } from '../../../model/ActionMarketing';

@Injectable({
  providedIn: 'root'
})
export class SystemePredictionServiceService {
  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}
);
  constructor(private httpclient:HttpClient) { }

  Predict(action:any){
    return this.httpclient.post<any>(environment.backend_url_Prediction+"PredictionduVue",action,{ headers: this.header },
    );
  
  }
}
