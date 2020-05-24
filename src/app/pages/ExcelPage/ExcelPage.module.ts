import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelPageComponent } from './ExcelPage.component';

import { HeaderComponent } from 'src/app/components/Header/Header.component';
import { ToolbarComponent } from 'src/app/components/Toolbar/Toolbar.component';
import { FormulaComponent } from 'src/app/components/Formula/Formula.component';
import { TableComponent } from 'src/app/components/Table/Table.component';
import { FromCharCodePipe } from 'src/app/pipes/fromCharCode.pipe';
import { NgLetDirective } from 'src/app/directives/ngLet.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ExcelPageComponent,
    HeaderComponent,
    ToolbarComponent,
    FormulaComponent,
    TableComponent,
    FromCharCodePipe,
    NgLetDirective
  ],
})
export class ExcelPageModule { }
