import { PointVente } from "../PointVente";
export class PointeVentePartenaireDTO{
      idPartenaire:String;
      abbreviation:String;
      adresse:String;
      nTel:String;
      statut:number;
      prix:number;
      listePointVente:PointVente[];
}