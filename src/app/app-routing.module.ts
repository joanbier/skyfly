import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./core/components/login/login.component";
import {DashboardComponent} from "./core/components/dashboard/dashboard.component";
import {AuthGuard} from "./core/services/auth.guard";
import {PageNotFoundComponent} from "./core/components/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'flights', pathMatch: 'full'},
      {
        path: 'flights',
        loadChildren: () => import('./flights/flights.module').then(m => m.FlightsModule),
      },
    ]
  },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
