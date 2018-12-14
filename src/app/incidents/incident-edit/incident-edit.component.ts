import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";
import {Incident} from "../incident.model";
import {IncidentsService} from "../incidents.service";

@Component({
  selector: 'app-incident-edit',
  templateUrl: './incident-edit.component.html',
  styleUrls: ['./incident-edit.component.css']
})
export class IncidentEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') incidentForm: NgForm; // local reference in template
  subscription: Subscription;
  editMode = false;
  editedIncidentIndex: number;
  editedIncident: Incident;

  constructor(private incidentService: IncidentsService) { }

  ngOnInit() {
    this.subscription = this.incidentService.startedEditing
      .subscribe(
        (index:number) => {
          this.editedIncidentIndex = index;
          this.editMode = true;
          this.editedIncident = this.incidentService.getIncident(index);
          this.incidentForm.setValue({
            id: this.editedIncident.id,
            status: this.editedIncident.status,
            title: this.editedIncident.title,
            priority: this.editedIncident.priority,
            description: this.editedIncident.description
          })
        }
      )
  }

  onAddIncident

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
