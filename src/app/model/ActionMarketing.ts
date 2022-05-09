export class ActionMarketing{
      idActionMarketing:string;
      idPartenaire:string;
      idCategorie:string;
      idPopulationCible:String;
      idStorage:string;
      idCanaldiffusion:string;
      idFormatAffichage:string;
      titre:string;
      typeContenue:number; //image video
      externUrl:string;
      description:string;
      smsBody:string;
      dateDebut:Date;
      dateFin:Date;
      frequence:number;
      statut:number;//crée ,accepter ,refuser ,en cours diffusion
      dateCreation:Date;
}

