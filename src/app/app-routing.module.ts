import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertEditorComponent } from './components/alert-editor/alert-editor.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AlertGuard } from './core/gurds/alert-gurd.guard';

const routes: Routes = [
  {path: '', redirectTo: 'alertsEditor', pathMatch: 'full'},
  {path: 'alertsEditor', component: AlertEditorComponent},
  {path: 'alerts', component: AlertsComponent , canActivate:[AlertGuard]},
  {path: '**', component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
