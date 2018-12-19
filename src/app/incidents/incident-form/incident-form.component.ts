import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {IncidentsService} from "../incidents.service";
import {Incident} from "../incident.model";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css']
})
export class IncidentFormComponent implements OnInit {

  incidentId: number;
  incident: Incident;
  editMode = false;
  incidentForm: FormGroup;

  constructor(private route: ActivatedRoute, private incidentService: IncidentsService) { } // get access to currently loaded route

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.incidentId = +params['id'];
          this.editMode = +params['id'] != null;
          this.initForm();
        }
      )
  }

  private initForm() {
    let incidentId = 1;
    let incidentTitle = 'Title';
    let incidentDescription = 'Description';
    let incidentPriority = 3;
    let incidentStatus = 'Open';
    let incidentClient= new FormArray([]);

    console.log(this.editMode);
    console.log(this.incidentService.getNewIncidentId());

    if (this.editMode) {
      const incidentPull = this.incidentService.getIncidentById(this.incidentId);
      incidentTitle = incidentPull.title;
      incidentDescription = incidentPull.description;
      incidentPriority = incidentPull.priority;
      incidentStatus = incidentPull.status;
      incidentId = incidentPull.id;
      incidentClient.push(
        new FormGroup({
          'name': new FormControl(incidentPull.client.name, Validators.required),
          'region': new FormControl(incidentPull.client.region, Validators.required)
        })
      )
    } else {
      incidentId = this.incidentService.getNewIncidentId();
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
