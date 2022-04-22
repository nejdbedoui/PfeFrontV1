import { PartenaireBpriceEndPointService } from './../service/bp-api-pos/partenaire-bprice-end-point/partenaire-bprice-end-point.service';
import { PointVenteEndPointService } from './../service/bp-api-pos/point-vente-end-point/point-vente-end-point.service';
import { Component, OnInit } from '@angular/core';

import { MENU_ITEMSTABLEAU } from './pages-menu';
import { UtilisateurEndPointService } from '../service/bp-api-admin/utilisateur-end-point/utilisateur-end-point.service';
import { Access } from '../model/enum/Access';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu *ngIf="menu" [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  reservation: {
    title: 'Gestion des Rendez-vous',
    icon: 'calendar-outline',
    link: '/pages/Pointvente/gestionRendezVous',

  }
  constructor(
    private utilisateurEndPointService: UtilisateurEndPointService) { }
  ngOnInit(): void {
   
        this.localMenu = MENU_ITEMSTABLEAU;
        this.getConnectedUser();
     
  }


  getConnectedUser() {
    this.utilisateurEndPointService.findUtilisateurByIdUtilisateur(localStorage.getItem("UserId")).subscribe(user => {
      if (user.objectResponse.accessPermissions != null) {

        if (localStorage.getItem("type") == null) {
          let permissionsPv = user.objectResponse.accessPermissions.accessPermissionsPv.find(el => el.pointVente == localStorage.getItem("pointventeid"))
          console.log(permissionsPv);
          this.localMenu = this.localMenu.filter(m => permissionsPv.permissions.find(p => Access[p.functionName.toString()] == m.title && p.checked) != null)
        } else if (localStorage.getItem("type") == '1') {
          let settingPermissions = user.objectResponse.accessPermissions.settingsPermissions
          this.localMenu[0].children = this.localMenu[0].children.filter(m => settingPermissions.find(p => Access[p.functionName.toString()] == m.title && p.checked) != null)
        }
      }

      console.log(this.localMenu);
      this.menu = this.localMenu;
    })
  }

  menu: any
  localMenu: any
}
