import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcelPageComponent } from './pages/ExcelPage/ExcelPage.component';
import { DashboardPageComponent } from './pages/DashboardPage/DashboardPage.component';
import { NotFoundPageComponent } from './pages/NotFoundPage/NotFoundPage.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/excel'
  },
  {
    path: 'excel',
    component: ExcelPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
