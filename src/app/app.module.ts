import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { AgGridModule } from 'ag-grid-angular';
import { AnalysisComponent } from './analysis/analysis.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from './material.modules';
import { MonitorComponent } from './monitor/monitor.component';
import { TraineeState } from './state/main.state';


@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    AnalysisComponent,
    MonitorComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AgChartsAngularModule,
    AgGridModule.withComponents([]),
    NgxsModule.forRoot([TraineeState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
