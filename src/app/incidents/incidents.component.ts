import {IncidentsService} from "./incidents.service";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Incident} from "./incident.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit, OnDestroy {

  incidents: Incident[];
  incident: Incident;
  private subscription: Subscription;

  id: number;


  constructor(private incidentService: IncidentsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.incidents = this.incidentService.getIncidents();
    this.subscription = this.incidentService.incidentChanged
      .subscribe(
        (incidents: Incident []) => {
          this.incidents = incidents;
        }
      )
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.incident = this.incidentService.getIncident(this.id);
        }
      )
  }

  onEditIncident(index: number) {
    this.incidentService.startedEditing.next(index);
  }

  onViewIncident(index: number) {
    this.router.navigate([index], {relativeTo: this.route});
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
