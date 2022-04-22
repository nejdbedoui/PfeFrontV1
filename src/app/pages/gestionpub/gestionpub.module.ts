import { NgModule } from '@angular/core';
import { GestionpubRoutingRoutingModule } from './gestionpub-routing.module';
import { GestionpubComponent } from './gestionpub.component';
import { GestionActionMarketingComponent } from './gestion-action-marketing/gestion-action-marketing.component';




@NgModule({
  declarations: [GestionpubComponent, GestionActionMarketingComponent],
  imports: [
    GestionpubRoutingRoutingModule,
  
  ]
})
export class GestionpubModule { }
