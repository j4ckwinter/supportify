import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {IncidentsService} from "../incidents.service";

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css']
})
export class IncidentFormComponent implements OnInit {

  incidentId: number;
  editMode = false;
  incidentForm: FormGroup;

  constructor(private route: ActivatedRoute, private incidentService: IncidentsService) { } // get access to currently loaded route

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.incidentId = +params['id'];
          this.editMode = +params['id'] != null;
          if(this.incidentId !== this.incidentId) {
            this.editMode = false;
          }
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


    if (this.editMode) {
      const incident = this.incidentService.getIncidentById(this.incidentId);
      incidentTitle = incident.title;
      incidentDescription = incident.description;
      incidentPriority = incident.priority;
      incidentStatus = incident.status;
      incidentId = incident.id;
      incidentClient.push(
        new FormGroup({
          'name': new FormControl(incident.client.name, Validators.required),
          'region': new FormControl(incident.client.region, Validators.required)
        })
      )
    } else {
      incidentId = this.incidentService.getNewIncidentId();
      incidentClient.push(
        new FormGroup({
          'name': new FormControl("Name", Validators.required),
          'region': new FormControl("Region", Validators.required)
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

  onSubmit() {
    this.addOrUpdateClient();
    if (this.editMode) {
      this.incidentService.updateIncident(this.incidentId, this.incidentForm.value);
    } else {
      this.incidentService.addIncident(this.incidentForm.value);
    }
  }

  addOrUpdateClient() {
    if (this.editMode) {

    } else {
      (<FormArray>this.incidentForm.get('client')).push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'region': new FormControl(null, Validators.required)
        })
      )
    }
  }

}
