import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IncidentsComponent} from "./incidents/incidents.component";
import {ClientsComponent} from "./clients/clients.component";
import {IncidentFormComponent} from "./incidents/incident-form/incident-form.component";

const routes: Routes = [
  { path: '', redirectTo: '/incidents', pathMatch: 'full' },
  { path: 'incidents', component: IncidentsComponent},
  { path: 'incidents/:id', component: IncidentFormComponent},
  { path: 'clients', component: ClientsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
