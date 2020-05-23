import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExcelPageModule } from './pages/ExcelPage/ExcelPage.module';
import { DashboardPageModule } from './pages/DashboardPage/DashboardPage.module';
import { NotFoundPageModule } from './pages/NotFoundPage/NotFoundPage.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ExcelPageModule,
    DashboardPageModule,
    NotFoundPageModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
