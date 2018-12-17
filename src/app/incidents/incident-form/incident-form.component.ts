import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {IncidentsService} from "../incidents.service";
import {Incident} from "../incident.model";

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css']
})
export class IncidentFormComponent implements OnInit {

  incidentId: number;
  incident: Incident;
  editMode = true;
  incidentForm: FormGroup;

  constructor(private route: ActivatedRoute, private incidentService: IncidentsService) { } // get access to currently loaded route

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.incidentId = +params['id'];
          this.incident = this.incidentService.getIncidentById(this.incidentId);
          this.initForm();
        }
      )
  }

  private initForm() {
    let incidentId = 1;
    let incidentTitle = '';
    let incidentDescription = '';
    let incidentPriority = 3;
    let incidentStatus = '';
    let incidentClient= new FormArray([]);

    if (this.editMode) {
      incidentTitle = this.incident.title;
      incidentDescription = this.incident.description;
      incidentPriority = this.incident.priority;
      incidentStatus = this.incident.status;
      incidentId = this.incident.id;
      incidentClient.push(
        new FormGroup({
          'name': new FormControl(this.incident.client.name, Validators.required),
          'region': new FormControl(this.incident.client.region, Validators.required)
        })
      )
    }
    this.incidentForm = new FormGroup({
      'id': new FormControl(incidentId, Validators.required),
      'title': new FormControl(incidentTitle, Validators.required),
      'description': new FormControl(incidentDescription, Validators.required),
      'priority': new FormControl(incidentPriority, Validators.required),
      'status': new FormControl(incidentStatus, Validators.required),
      'client': incidentClient
    });
  }

  getControls() {
    return (<FormArray>this.incidentForm.get('client')).controls;
  }

}
