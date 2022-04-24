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
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { CreateActionComponent } from './gestion-action-marketing/create-action/create-action.component';
import { BreadCrumbModule } from '../../bread-crumb/bread-crumb.module';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [GestionpubComponent, GestionActionMarketingComponent, CreateActionComponent],
  imports: [
    CommonModule,
    NbSelectModule,
    FileUploadModule,
    HttpClientModule,
    NbIconModule,
    BreadCrumbModule,
    NbCheckboxModule,
    NbButtonModule,
    NbInputModule,
    NbDatepickerModule,
    SelectButtonModule,
    FormsModule,
    NbCardModule,
    DropdownModule,
    InputTextareaModule,
    TooltipModule,
    GestionpubRoutingRoutingModule,
    
  
  ]
})
export class GestionpubModule { }
