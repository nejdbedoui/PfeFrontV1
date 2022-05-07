import { NgModule } from '@angular/core';
import { GestionpubRoutingRoutingModule } from './gestionpub-routing.module';
import { GestionpubComponent } from './gestionpub.component';
import { GestionActionMarketingComponent } from './gestion-action-marketing/gestion-action-marketing.component';
import {FileUploadModule} from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {SelectButtonModule} from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbSelectModule, NbStepperModule } from '@nebular/theme';
import { CreateActionComponent } from './gestion-action-marketing/create-action/create-action.component';
import { BreadCrumbModule } from '../../bread-crumb/bread-crumb.module';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TooltipModule} from 'primeng/tooltip';
import { DataTablesModule } from 'angular-datatables';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DetailsActionComponent } from './gestion-action-marketing/details-action/details-action.component';


@NgModule({
  declarations: [GestionpubComponent, GestionActionMarketingComponent, CreateActionComponent, DetailsActionComponent],
  imports: [
    CommonModule,
    MenuModule,
    NbSelectModule,
    FileUploadModule,
    NbStepperModule,
    HttpClientModule,
    NbIconModule,
    BreadCrumbModule,
    ButtonModule,
    NbCheckboxModule,
    SelectButtonModule,
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
    DataTablesModule,
    TableModule,
    ReactiveFormsModule
    
  
  ]
})
export class GestionpubModule { }
