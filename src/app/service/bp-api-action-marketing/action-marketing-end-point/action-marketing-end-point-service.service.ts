import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ActionMarketing } from '../../../model/ActionMarketing';
import { ActionMarketingDTO } from '../../../model/dto/ActionmarketingDTO';
import { ActionMarketingDTOResponse } from '../../../model/response/ActionMarketingDTOResponse';
import { ActionMarketingResponse } from '../../../model/response/ActionMarketingResponse';
import { DemandeActionMarketingDTOResponse } from '../../../model/response/DemandeActionMarketingDTOResponse';
import { OneActionMarketingResponse } from '../../../model/response/OneActionMarketingResponse';
import { StorageResponse } from '../../../model/response/StorageResponse';

@Injectable({
  providedIn: 'root'
})
export class ActionMarketingEndPointServiceService {
 

  constructor(private httpclient:HttpClient) { }
  
  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'}
);


CreateActionMarketing(Action:ActionMarketing){
  return this.httpclient.post<OneActionMarketingResponse>(environment.backend_url_Publicite+"CreateActionMarketing/",Action,{ headers: this.header });

}
findByidPartenaireAllActionMarketing(idPartenaire:String){
  return this.httpclient.get<ActionMarketingResponse>(environment.backend_url_Publicite+"findAllByIdPartenaire/"+idPartenaire,{ headers: this.header }); 

}

findByidActionMarketing(idAction:String){
  return this.httpclient.get<OneActionMarketingResponse>(environment.backend_url_Publicite+"findByIdActionMarketing/"+idAction,{ headers: this.header }); 
}

findAllActionMarketing(){
  return this.httpclient.get<ActionMarketingResponse>(environment.backend_url_Publicite+"findAllActionMarketing/",{ headers: this.header }); 
}

deleteActionMarketing(idAction:String){
  return this.httpclient.delete<any>(environment.backend_url_Publicite+"DeleteActionMarketing/"+idAction,{ headers: this.header });

}
updateActionMarketing(Action:ActionMarketing){
  return this.httpclient.put<OneActionMarketingResponse>(environment.backend_url_Publicite+"UpdateActionMarketing/",Action,{ headers: this.header });
}

 uplodeimage(file:File){
  let myNewFile = new File([file], file.name, {type: file.type});
    let formdata: FormData = new FormData(); 
    formdata.append('file', myNewFile);
      return this.httpclient.post<any>(environment.backend_url_Publicite+"Addtostorage/",formdata);
  }
  


  findfileByid(idAction:String){
    return this.httpclient.get<Storage>(environment.backend_url_Publicite+"finditembyid/"+idAction,{ headers: this.header }); 
  }

  findAllStorage(){
    return this.httpclient.get<StorageResponse>(environment.backend_url_Publicite+"findAllStorage/",{ headers: this.header }); 
  }



  findAllActionMarketingDTOByIdPartenaire(id:String){
    return this.httpclient.get<ActionMarketingDTOResponse>(environment.backend_url_Publicite+"findAllActionMarketingDTOByIdPartenaire/"+id,{ headers: this.header });
  }

  findAllActionMarketingDTO(){
    return this.httpclient.get<ActionMarketingDTOResponse>(environment.backend_url_Publicite+"findAllActionMarketingDTO/",{ headers: this.header });

  }

  findAllActionMarketingDTOWithStatutBiggerThan(statut:number){
    return this.httpclient.get<ActionMarketingDTOResponse>(environment.backend_url_Publicite+"findAllActionMarketingDTOWithStatutBiggerThan/"+statut,{ headers: this.header });

  }

  findAllActionMarketingByCanalDTO(idCanal:String){
    return this.httpclient.get<ActionMarketingDTOResponse>(environment.backend_url_Publicite+"findAllActionMarketingByIdCanalDiffusionDTO/"+idCanal,{ headers: this.header });

  }
  GenerateContrat(action: ActionMarketingDTO) {
    return this.httpclient.post<OneActionMarketingResponse>(environment.backend_url_Publicite+"CreateContratActionMarketing/",action,{ headers: this.header });
  }
  findAllActionMarketingDTOByStatut(statut:number){
    return this.httpclient.get<ActionMarketingDTOResponse>(environment.backend_url_Publicite+"findAllActionMarketingDTOByStatut/"+statut,{ headers: this.header });

  }
  findAllDemandeActionMarketing(){
    return this.httpclient.get<DemandeActionMarketingDTOResponse>(environment.backend_url_Publicite+"findAllDemandeActionMarketing/",{ headers: this.header });


  }
  

  getNotificationPartenaire(num:number,idPartenaire:string){
    return this.httpclient.get<number>(environment.backend_url_Publicite+"numbernotifpartenaire/"+idPartenaire+"/"+num,{ headers: this.header });

  }
  getNotificationAdmin(num:number){
    return this.httpclient.get<number>(environment.backend_url_Publicite+"numbernotif/"+num,{ headers: this.header });

  }

}
