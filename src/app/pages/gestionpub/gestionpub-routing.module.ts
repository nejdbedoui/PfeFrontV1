import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { GestionActionMarketingComponent } from './gestion-action-marketing/gestion-action-marketing.component';
import { GestionpubComponent } from './gestionpub.component';


const routes: Routes = [

  {
    path: '',
    component: GestionpubComponent,
    children:[
      {path:'actionmarketing',component:GestionActionMarketingComponent,canActivate: [AuthGuardService]},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionpubRoutingRoutingModule { }
