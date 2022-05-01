export class ActionMarketing{
      idActionMarketing:string;
      idPartenaire:string;
      idCategorie:string;
      idPopulationCible:String;
      titre:string;
      libelleCanalDiffusion:string;//tv mobile sms
      typeContenue:string; //image video
      urlContenue:string[];
      url:string;
      description:string;
      smsBody:string;
      dateDebut:Date;
      dateFin:Date;
      frequence:number;
      typeAffichageMobile:string;//pop up banniere notification
      statut:string;//crée ,accepter ,refuser ,en cours diffusion
      dateCreation:Date;
}