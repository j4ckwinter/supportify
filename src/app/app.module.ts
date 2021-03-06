import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {DropdownDirective} from "./shared/dropdown.directive";
import { IncidentsComponent } from './incidents/incidents.component';
import { ClientsComponent } from './clients/clients.component';
import { IncidentEditComponent } from './incidents/incident-edit/incident-edit.component';
import {IncidentsService} from "./incidents/incidents.service";
import {HttpClientModule} from "@angular/common/http";
import { IncidentFormComponent } from './incidents/incident-form/incident-form.component';
import { MergingComponent } from './merging/merging.component';
import { MergeFormComponent } from './merging/merge-form/merge-form.component';
import {DataStorageService} from "./shared/data-storage.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    IncidentsComponent,
    ClientsComponent,
    IncidentEditComponent,
    IncidentFormComponent,
    MergingComponent,
    MergeFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    IncidentsService,
    DataStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
