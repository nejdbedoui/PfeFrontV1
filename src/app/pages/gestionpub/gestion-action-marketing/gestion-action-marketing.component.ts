import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionMarketing } from '../../../model/ActionMarketing';
import { ActionMarketingDTO } from '../../../model/dto/ActionmarketingDTO';
import { ActionMarketingEndPointServiceService } from '../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';

@Component({
  selector: 'ngx-gestion-action-marketing',
  templateUrl: './gestion-action-marketing.component.html',
  styleUrls: ['./gestion-action-marketing.component.scss']
})
export class GestionActionMarketingComponent implements OnInit {
  affichefilter:boolean=false;
  selectedItem:string;
  stateOptions: any[];
  value1: string = "";
  loading:boolean = false;
  ActionsMarketing: ActionMarketingDTO[];
  id: string = localStorage.getItem("partenaire2");
  image:string="image";
  video:string="video";
  constructor(private route: Router,private _actionMarketingService:ActionMarketingEndPointServiceService,private datePipe: DatePipe) { 
    this.stateOptions = [{label: 'image', value: 0}, {label: 'video', value: 1}];
    


 }

  ngOnInit() {
    this.getAllActionsMarketing();

   
  }

  getStatusAction(stat:number){
    if(stat==0)
    return "Crée"
    else if(stat==1)
    return "En Attente"
    else if(stat==2)
    return "Confirmé"
    else if(stat==3)
    return "Refusé"
    else if(stat==4)
    return "En Cours"
    else if(stat==5)
    return "Terminée"
  }


  ListeCanalDiffusion:any[]=[];
  ListeStatutAction:any[]=[];
listeStorages:Storage[];
 getAllActionsMarketing(){
  this.loading = true;
   this._actionMarketingService.findAllActionMarketingDTOByIdPartenaire(this.id).subscribe(val=>
    {
      if(val.result==1){
        this.ActionsMarketing=val.objectResponse;
        this.Actions = this.ActionsMarketing;
        this.ActionsMarketing.filter(value=>{
          if (this.ListeCanalDiffusion.indexOf(value.canal) === -1) {
            this.ListeCanalDiffusion.push(value.canal);
        }
        if(this.ListeStatutAction.indexOf(value.statut)===-1){
          this.ListeStatutAction.push(value.statut);
        }
        })
      this.ListeCanalDiffusion.sort();
      this.ListeStatutAction.sort();
        this.loading = false;
      }
    }
    )
   
 }


  ajouteraction() {
    this.route.navigateByUrl("/pages/gestionpub/gestionactionmarketing/ajouteraction");
  }

  //Filter
  CanalChoisi:String = 'default';
StatutChoisi:number = -1;
DateDebutChoisi:Date;
DateFinChoisi:Date;
PartenaireChoisi:String;
  ChoisirCanalDiffusion(event){
    this.CanalChoisi = event;
    this.Filtrer(this.CanalChoisi,this.StatutChoisi,this.PartenaireChoisi,this.DateDebutChoisi,this.DateFinChoisi);

  }
  ChoisirStatutAction(event){
    this.StatutChoisi = event;
    this.Filtrer(this.CanalChoisi,this.StatutChoisi,this.PartenaireChoisi,this.DateDebutChoisi,this.DateFinChoisi);
  }

  ChoisirDateDebut(event){
    this.DateDebutChoisi = event;
    console.log(this.DateDebutChoisi)
    this.Filtrer(this.CanalChoisi,this.StatutChoisi,this.PartenaireChoisi,this.DateDebutChoisi,this.DateFinChoisi);
  }
  ChoisirDateFin(event){
    this.DateFinChoisi = event;
    console.log(this.DateFinChoisi)
    this.Filtrer(this.CanalChoisi,this.StatutChoisi,this.PartenaireChoisi,this.DateDebutChoisi,this.DateFinChoisi);

  }
  ChoisirPartenaire(event){
    this.PartenaireChoisi = event;
    console.log(this.PartenaireChoisi)
    this.Filtrer(this.CanalChoisi,this.StatutChoisi,this.PartenaireChoisi,this.DateDebutChoisi,this.DateFinChoisi);

  }

  Actions:ActionMarketingDTO[];
Filtrer(CanalDiffusion:String,StatutAction:number,Partenaire:String,DateDebut:Date,DateFin:Date){

    this.Actions = this.ActionsMarketing;
    if (CanalDiffusion != "default")
      this.Actions = this.Actions.filter(
        item => item.canal == CanalDiffusion
      );

    if (StatutAction != -1)
      this.Actions = this.Actions.filter(
        item => item.statut == StatutAction
      );
      if (DateDebut != null && DateFin==null)
      this.Actions = this.Actions.filter(
        item => this.format(new Date(item.dateCreation)) == this.format(DateDebut)
      );
      if (DateDebut != null && DateFin!=null)
      this.Actions = this.Actions.filter(
        item => this.format(new Date(item.dateCreation)) >= this.format(DateDebut) && this.format(new Date(item.dateCreation)) <= this.format(DateFin)
      );
      if (DateDebut == null && DateFin!=null)
      this.Actions = this.Actions.filter(
        item => this.format(new Date(item.dateCreation)) < this.format(DateDebut)
      );

}
format(a) {
  return this.datePipe.transform(a, 'dd/MM/yyyy')
}
clean() {
  this.DateDebutChoisi = null;
  this.DateFinChoisi = null;
  this.CanalChoisi = "default";
  this.StatutChoisi = -1;
  this.PartenaireChoisi = "default";
  this.Filtrer(this.CanalChoisi,this.StatutChoisi,this.PartenaireChoisi,this.DateDebutChoisi,this.DateFinChoisi);
}



}
