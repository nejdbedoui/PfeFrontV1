import { NgModule } from '@angular/core';
import { GestionpubRoutingRoutingModule } from './gestionpub-routing.module';
import { GestionpubComponent } from './gestionpub.component';
import { GestionActionMarketingComponent } from './gestion-action-marketing/gestion-action-marketing.component';
import {FileUploadModule} from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {SelectButtonModule} from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { NbCardModule, NbInputModule, NbSelectModule } from '@nebular/theme';


@NgModule({
  declarations: [GestionpubComponent, GestionActionMarketingComponent],
  imports: [
    CommonModule,
    NbSelectModule,
    FileUploadModule,
    HttpClientModule,
    NbInputModule,
    SelectButtonModule,
    FormsModule,
    NbCardModule,
    DropdownModule,
    GestionpubRoutingRoutingModule,
  
  ]
})
export class GestionpubModule { }
