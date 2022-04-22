
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'Administration',
      loadChildren: () => import('app/pages/administration/administration.module')
        .then(m => m.AdministrationModule),
        canActivate: [AuthGuardService],
    },
    {
      path: 'gestionpub',
      loadChildren: () => import('app/pages/gestionpub/gestionpub.module')
        .then(m => m.GestionpubModule),
        canActivate: [AuthGuardService],
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
      canActivate: [AuthGuardService],
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
