export class ActionMarketing{
      idActionMarketing:string;
      idPartenaire:string;
      idCategorie:string;
      idPopulationCible:String;
      idStorage:string;
      titre:string;
      libelleCanalDiffusion:number;//tv mobile sms
      typeContenue:number; //image video
      externUrl:string;
      description:string;
      smsBody:string;
      dateDebut:Date;
      dateFin:Date;
      frequence:number;
      typeAffichageMobile:number;//pop up banniere notification
      statut:number;//crée ,accepter ,refuser ,en cours diffusion
      dateCreation:Date;
}