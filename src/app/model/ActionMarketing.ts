export class ActionMarketing{
      idActionMarketing:String;
      idPartenaire:String;
      idCategorie:String;
      idPopulationCible:String;
      libelleCanalDiffusion:String;//tv mobile sms
      typeContenue:String; //image video
      urlContenue:String[];
      url:String;
      description:String;
      smsBody:String;
      dateDebut:Date;
      dateFin:Date;
      frequence:number;
      typeAffichageMobile:String;//pop up banniere notification
      statut:String;//crée ,accepter ,refuser ,en cours diffusion
      dateCreation:Date;
}