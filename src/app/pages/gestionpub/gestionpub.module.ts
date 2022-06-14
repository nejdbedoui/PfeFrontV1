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
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbListModule, NbProgressBarModule, NbSelectModule, NbSpinnerModule, NbStepperModule, NbTabsetModule, NbToggleModule } from '@nebular/theme';
import { CreateActionComponent } from './gestion-action-marketing/create-action/create-action.component';
import { BreadCrumbModule } from '../../bread-crumb/bread-crumb.module';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TooltipModule} from 'primeng/tooltip';
import { DataTablesModule } from 'angular-datatables';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DetailsActionComponent } from './gestion-action-marketing/details-action/details-action.component';
import {ListboxModule} from 'primeng/listbox';
import { GestionActionMarketingAdminComponent } from './gestion-action-marketing-admin/gestion-action-marketing-admin.component';
import { DetailActionComponent } from './gestion-action-marketing-admin/detail-action/detail-action.component';
import { ActionMobileComponent } from './gestion-action-marketing-admin/action-mobile/action-mobile.component';
import { ActionSmsComponent } from './gestion-action-marketing-admin/action-sms/action-sms.component';
import { ActionTvComponent } from './gestion-action-marketing-admin/action-tv/action-tv.component';
import { ParametrageActionComponent } from './gestion-action-marketing-admin/parametrage-action/parametrage-action.component';
import {CardModule} from 'primeng/card';
import { GestionContractComponent } from './gestion-action-marketing/gestion-contract/gestion-contract.component';
import { DashboardRealTimeComponent } from './dashboard-real-time/dashboard-real-time.component';
// ADDED TESTING CHART
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ThemeModule } from '../../@theme/theme.module';
import { ChartModule } from 'angular2-chartjs';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ECommerceLegendChartComponent } from '../e-commerce/legend-chart/legend-chart.component';
import { ECommerceVisitorsAnalyticsChartComponent } from '../e-commerce/visitors-analytics/visitors-analytics-chart/visitors-analytics-chart.component';
import { SlideOutComponent } from '../e-commerce/slide-out/slide-out.component';
import { ECommerceVisitorsStatisticsComponent } from '../e-commerce/visitors-analytics/visitors-statistics/visitors-statistics.component';
import { ECommerceVisitorsAnalyticsComponent } from '../e-commerce/visitors-analytics/visitors-analytics.component';
import { DashboardStatistiqueclicketvueChartComponent } from './dashboard-real-time/Vue-Et-Click-Chart-analytics/visitors-analytics-chart/visitors-analytics-chart.component';
import { DashboardVueEtClickStatisticsComponent } from './dashboard-real-time/Vue-Et-Click-Chart-analytics/visitors-statistics/visitors-statistics.component';
import { DashboardStatistiqueVueEtClick } from './dashboard-real-time/Vue-Et-Click-Chart-analytics/visitors-analytics.component';
import { ECommerceUserActivityComponent } from '../e-commerce/user-activity/user-activity.component';
import { ECommerceChartsPanelComponent } from '../e-commerce/charts-panel/charts-panel.component';
import { ChartPanelSummaryComponent } from '../e-commerce/charts-panel/chart-panel-summary/chart-panel-summary.component';
import { ChartPanelHeaderComponent } from '../e-commerce/charts-panel/chart-panel-header/chart-panel-header.component';
import { OrdersChartComponent } from '../e-commerce/charts-panel/charts/orders-chart.component';
import { ProfitChartComponent } from '../e-commerce/charts-panel/charts/profit-chart.component';
import { CountryOrdersChartComponent } from '../e-commerce/country-orders/chart/country-orders-chart.component';
import { CountryOrdersComponent } from '../e-commerce/country-orders/country-orders.component';
import { CountryOrdersMapComponent } from '../e-commerce/country-orders/map/country-orders-map.component';
import { ECommerceComponent } from '../e-commerce/e-commerce.component';
import { EarningCardBackComponent } from '../e-commerce/earning-card/back-side/earning-card-back.component';
import { EarningPieChartComponent } from '../e-commerce/earning-card/back-side/earning-pie-chart.component';
import { EarningCardComponent } from '../e-commerce/earning-card/earning-card.component';
import { EarningCardFrontComponent } from '../e-commerce/earning-card/front-side/earning-card-front.component';
import { EarningLiveUpdateChartComponent } from '../e-commerce/earning-card/front-side/earning-live-update-chart.component';
import { StatsAreaChartComponent } from '../e-commerce/profit-card/back-side/stats-area-chart.component';
import { StatsCardBackComponent } from '../e-commerce/profit-card/back-side/stats-card-back.component';
import { StatsBarAnimationChartComponent } from '../e-commerce/profit-card/front-side/stats-bar-animation-chart.component';
import { StatsCardFrontComponent } from '../e-commerce/profit-card/front-side/stats-card-front.component';
import { ProfitCardComponent } from '../e-commerce/profit-card/profit-card.component';
import { ECommerceProgressSectionComponent } from '../e-commerce/progress-section/progress-section.component';
import { TrafficBackCardComponent } from '../e-commerce/traffic-reveal-card/back-side/traffic-back-card.component';
import { TrafficBarChartComponent } from '../e-commerce/traffic-reveal-card/back-side/traffic-bar-chart.component';
import { TrafficBarComponent } from '../e-commerce/traffic-reveal-card/front-side/traffic-bar/traffic-bar.component';
import { TrafficFrontCardComponent } from '../e-commerce/traffic-reveal-card/front-side/traffic-front-card.component';
import { TrafficCardsHeaderComponent } from '../e-commerce/traffic-reveal-card/traffic-cards-header/traffic-cards-header.component';
import { TrafficRevealCardComponent } from '../e-commerce/traffic-reveal-card/traffic-reveal-card.component';
import { ConfiguationActionsMarketingGeneraleComponent } from './gestion-action-marketing-admin/configuation-actions-marketing-generale/configuation-actions-marketing-generale.component';
import { CreateCanalDiffusionComponent } from './gestion-action-marketing-admin/configuation-actions-marketing-generale/create-canal-diffusion/create-canal-diffusion.component';
import { CreateTypeAffichageComponent } from './gestion-action-marketing-admin/configuation-actions-marketing-generale/create-type-affichage/create-type-affichage.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DashboardPrincipaleComponent } from './dashboard-principale/dashboard-principale.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { Carousel, CarouselModule } from 'primeng/primeng';





@NgModule({
  declarations: [GestionpubComponent, GestionActionMarketingComponent, CreateActionComponent, DetailsActionComponent, GestionActionMarketingAdminComponent, DetailActionComponent, ActionMobileComponent, ActionSmsComponent, ActionTvComponent, ParametrageActionComponent, GestionContractComponent, DashboardRealTimeComponent,ECommerceLegendChartComponent,SlideOutComponent,DashboardStatistiqueclicketvueChartComponent,DashboardVueEtClickStatisticsComponent,DashboardStatistiqueVueEtClick,
    ECommerceComponent,
    StatsCardFrontComponent,
    StatsAreaChartComponent,
    StatsBarAnimationChartComponent,
    ProfitCardComponent,
    ECommerceChartsPanelComponent,
    ChartPanelHeaderComponent,
    ChartPanelSummaryComponent,
    OrdersChartComponent,
    ProfitChartComponent,
    StatsCardBackComponent,
    TrafficRevealCardComponent,
    TrafficBarChartComponent,
    TrafficFrontCardComponent,
    TrafficBackCardComponent,
    TrafficBarComponent,
    TrafficCardsHeaderComponent,
    CountryOrdersComponent,
    CountryOrdersMapComponent,
    CountryOrdersChartComponent,
    ECommerceVisitorsAnalyticsComponent,
    ECommerceVisitorsAnalyticsChartComponent,
    ECommerceVisitorsStatisticsComponent,
    ECommerceLegendChartComponent,
    ECommerceUserActivityComponent,
    ECommerceProgressSectionComponent,
    SlideOutComponent,
    EarningCardComponent,
    EarningCardFrontComponent,
    EarningCardBackComponent,
    EarningPieChartComponent,
    EarningLiveUpdateChartComponent,
    ConfiguationActionsMarketingGeneraleComponent,
    CreateCanalDiffusionComponent,
    CreateTypeAffichageComponent,
    DashboardPrincipaleComponent,

  ],
  imports: [
    NbToggleModule,
    NbSpinnerModule,
    CommonModule,
    CardModule,
    MenuModule,
    ListboxModule,
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
    ReactiveFormsModule,
    NgxChartsModule,
    NgxEchartsModule,
    ChartModule,
    NbTabsetModule,
// ADDED FOR CHARTS
ThemeModule,
NbCardModule,
NbButtonModule,
NbIconModule,
NbSelectModule,
NbProgressBarModule,
NgxEchartsModule,
NgxChartsModule,
LeafletModule,
NbListModule,
MatGridListModule,
CarouselModule,
//ADDED FOR PARAMETRAGE
MatCardModule,
MatProgressSpinnerModule
  ]
})
export class GestionpubModule { }
