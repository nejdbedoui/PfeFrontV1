import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { ActionMobileComponent } from './gestion-action-marketing-admin/action-mobile/action-mobile.component';
import { ActionSmsComponent } from './gestion-action-marketing-admin/action-sms/action-sms.component';
import { ActionTvComponent } from './gestion-action-marketing-admin/action-tv/action-tv.component';
import { DetailActionComponent } from './gestion-action-marketing-admin/detail-action/detail-action.component';
import { GestionActionMarketingAdminComponent } from './gestion-action-marketing-admin/gestion-action-marketing-admin.component';
import { ParametrageActionComponent } from './gestion-action-marketing-admin/parametrage-action/parametrage-action.component';
import { CreateActionComponent } from './gestion-action-marketing/create-action/create-action.component';
import { DetailsActionComponent } from './gestion-action-marketing/details-action/details-action.component';
import { GestionActionMarketingComponent } from './gestion-action-marketing/gestion-action-marketing.component';
import { GestionContractComponent } from './gestion-action-marketing/gestion-contract/gestion-contract.component';
import { GestionpubComponent } from './gestionpub.component';


const routes: Routes = [

  {
    path: '',
    component: GestionpubComponent,
    children:[
      {path:'gestionactionmarketing',component:GestionActionMarketingComponent,canActivate: [AuthGuardService]},
      {path:'gestionactionmarketing/ajouteraction',component:CreateActionComponent,canActivate: [AuthGuardService]},
      {path:'gestionactionmarketing/detailsaction/:id',component:DetailsActionComponent,canActivate: [AuthGuardService]},
      {path:'gestionacontrat',component:GestionContractComponent,canActivate: [AuthGuardService]},
      {path:'gestionactionmarketingadmin',component:GestionActionMarketingAdminComponent,canActivate: [AuthGuardService]},
      {path:'gestionactionmarketingadmin/detailsaction/:id',component:DetailActionComponent,canActivate: [AuthGuardService]},
      {path:'gestionactionmarketingadmin/mobile',component:ActionMobileComponent,canActivate: [AuthGuardService]},
      {path:'gestionactionmarketingadmin/sms',component:ActionSmsComponent,canActivate: [AuthGuardService]},
      {path:'gestionactionmarketingadmin/tv',component:ActionTvComponent,canActivate: [AuthGuardService]},
      {path:'gestionactionmarketingadmin/parametrage/:id',component:ParametrageActionComponent,canActivate: [AuthGuardService]},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionpubRoutingRoutingModule { }
