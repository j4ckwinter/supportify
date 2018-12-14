import {IncidentsService} from "./incidents.service";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Incident} from "./incident.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit, OnDestroy {

  incidents: Incident[];
  private subscription: Subscription;
  panelOpenState = false;



  constructor(private incidentService: IncidentsService) { }

  ngOnInit() {
    this.incidents = this.incidentService.getIncidents();
    this.subscription = this.incidentService.incidentChanged
      .subscribe(
        (incidents: Incident []) => {
          this.incidents = incidents;
        }
      )
  }

  onEditIncident(index: number) {
    this.incidentService.startedEditing.next(index);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
