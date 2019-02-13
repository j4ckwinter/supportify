import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
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

  constructor(private route: ActivatedRoute,
              private incidentService: IncidentsService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.incidentId = +params['id'];
          this.editMode = +params['id'] != null;
          if (this.incidentId !== this.incidentId) {
            this.editMode = false;
          }
          this.initForm();
        }
      )
  }

  private initForm() {
    let incidentId = 1;
    let incidentTitle = '';
    let incidentDescription = '';
    let incidentPriority = 3;
    let incidentStatus = 'Open';
    let incidentClient = 'Client';
    let incidentRegion = 'Region';

    if (this.editMode) {
      const incident = this.incidentService.getIncidentById(this.incidentId);
      incidentTitle = incident.title;
      incidentDescription = incident.description;
      incidentPriority = incident.priority;
      incidentStatus = incident.status;
      incidentId = incident.id;
      incidentClient = incident.client;
      incidentRegion = incident.region;

    } else {
      incidentId = this.incidentService.getNewIncidentId();
    }
    this.incidentForm = new FormGroup({
      'id': new FormControl(incidentId, Validators.required),
      'title': new FormControl(incidentTitle, Validators.required),
      'description': new FormControl(incidentDescription, Validators.required),
      'priority': new FormControl(incidentPriority, Validators.required),
      'status': new FormControl(incidentStatus, Validators.required),
      'client': new FormControl(incidentClient, Validators.required),
      'region': new FormControl(incidentRegion, Validators.required)
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.incidentService.updateIncident(this.incidentId, this.incidentForm.value);
    } else {
      this.incidentService.addIncident(this.incidentForm.value);
    }
    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
