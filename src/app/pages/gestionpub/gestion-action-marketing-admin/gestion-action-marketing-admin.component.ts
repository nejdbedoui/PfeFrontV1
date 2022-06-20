import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionMarketingDTO } from '../../../model/dto/ActionmarketingDTO';
import { ActionMarketingEndPointServiceService } from '../../../service/bp-api-action-marketing/action-marketing-end-point/action-marketing-end-point-service.service';
import { GlobalServiceService } from '../../../service/GlobalService/global-service.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActionMarketing } from '../../../model/ActionMarketing';


@Component({
  selector: 'ngx-gestion-action-marketing-admin',
  templateUrl: './gestion-action-marketing-admin.component.html',
  styleUrls: ['./gestion-action-marketing-admin.component.scss']
})
export class GestionActionMarketingAdminComponent implements OnInit {

  affichefilter:boolean=false;
  selectedItem:string;
  stateOptions: any[];
  value1: string = "";
  loading:boolean = false;
  ActionsMarketing: ActionMarketingDTO[];
  ListeCanalDiffusion:any[]=[];
  ListeStatutAction:any[]=[];
  ListePartenaire:any[]=[];
  constructor(private route: Router,private _actionMarketingService:ActionMarketingEndPointServiceService,private datePipe: DatePipe,private _GlobalService: GlobalServiceService) { 
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


  getAllStorage(){
    return this._actionMarketingService.findAllStorage();
  }

  
listeStorages:Storage[];
 getAllActionsMarketing(){
  this.loading = true;
   this._actionMarketingService.findAllActionMarketingDTOByStatut(1).subscribe(val=>
    {
      console.log(val)
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
        if(this.ListePartenaire.indexOf(value.nomPartenaire)===-1){
          this.ListePartenaire.push(value.nomPartenaire);
        }
        })
      this.ListeCanalDiffusion.sort();
      this.ListeStatutAction.sort();
      this.ListePartenaire.sort();
        this.loading = false;
      }
    }
    )
   
 }

 

  ajouteraction() {
    this.route.navigateByUrl("/pages/gestionpub/gestionactionmarketing/ajouteraction");
  }
  public generatePDF(action:ActionMarketingDTO): void {
    var doc = new jsPDF();
    doc.text('Hello world!'+action.canal+'fdfd',20, 20);
  
    doc.save('Contrat.pdf');
  
  }
  GenerateContrat(action:ActionMarketingDTO){
    //if(action.statut == 5)
    this._actionMarketingService.GenerateContrat(action).subscribe(response=>{
      if(response.result == 1){
        this.generatePDF(action);
        console.log(response.objectResponse);
        
        this._GlobalService.showToast("success", "success", "Contrat générer avec succès")
      }
      else {
        this._GlobalService.showToast("danger", "Erreur", response.errorDescription)
      }
    });
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
      if (Partenaire != "default")
      this.Actions = this.Actions.filter(
        item => item.nomPartenaire == Partenaire
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
