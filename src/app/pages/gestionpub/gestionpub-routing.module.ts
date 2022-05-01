import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { CreateActionComponent } from './gestion-action-marketing/create-action/create-action.component';
import { DetailsActionComponent } from './gestion-action-marketing/details-action/details-action.component';
import { GestionActionMarketingComponent } from './gestion-action-marketing/gestion-action-marketing.component';
import { GestionpubComponent } from './gestionpub.component';


const routes: Routes = [

  {
    path: '',
    component: GestionpubComponent,
    children:[
      {path:'gestionactionmarketing',component:GestionActionMarketingComponent,canActivate: [AuthGuardService]},
      {path:'gestionactionmarketing/ajouteraction',component:CreateActionComponent,canActivate: [AuthGuardService]},
      {path:'gestionactionmarketing/detailsaction/:id',component:DetailsActionComponent,canActivate: [AuthGuardService]},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionpubRoutingRoutingModule { }
