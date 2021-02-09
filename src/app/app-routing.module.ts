import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { DataComponent } from './data/data.component';
import { MainComponent } from './main/main.component';
import { MonitorComponent } from './monitor/monitor.component';


const routes: Routes = [
  { path: '', redirectTo: 'main/data', pathMatch: 'full' },
  {
    path: 'main', component: MainComponent,
     children: [
      { path: 'data', component: DataComponent },
      { path: 'analysis', component: AnalysisComponent },
      { path: 'monitor', component: MonitorComponent }

    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
