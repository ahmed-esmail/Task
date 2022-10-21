import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListEmployeeComponent } from './employee/list-employees/list-employee.component';
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {
  AccumulationChartModule,
  AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService,
  ChartModule,
  PieSeriesService
} from "@syncfusion/ej2-angular-charts";
import { ChartEmployeeComponent } from './employee/chart-employees/chart-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    ChartEmployeeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ChartModule,
    AccumulationChartModule,
  ],
  providers: [PieSeriesService,
    AccumulationDataLabelService,
    AccumulationLegendService,
    AccumulationTooltipService],
  bootstrap: [AppComponent]
})
export class AppModule { }
