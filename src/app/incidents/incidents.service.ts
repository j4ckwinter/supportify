import {Incident} from "./incident.model";
import {Subject} from "rxjs";
import {Client} from "../clients/client.model";

export class IncidentsService {

  incidentChanged = new Subject<Incident[]>();
  startedEditing = new Subject<number>();
  lastIncident: Incident;
  newId: number;

  private incidents: Incident[] = [
    new Incident(
      10001,
      'Cross Site Scripting Vulnerability',
      'Issue with cross site scripting when accessing WebConnect',
      3,
      'Open',
        new Client(1, 'ABN', 'Netherlands')
      ),
    new Incident(
      10002,
      'Fails Not Being Auto Cancelled',
      'Fails processing bypassing max day rollover and not getting cancelled',
      2,
      'Open',
        new Client(2, 'Mizuho', 'Japan')
    )
  ];

  getIncidents() {
    return this.incidents.slice();
  }

  getIncident(index: number) {
    return this.incidents[index];
  }

  getIncidentById(id: number) {
    return this.incidents.find(x => x.id === id);
  }

  getNewIncidentId() {
    this.lastIncident = this.incidents[this.incidents.length - 1];
    return this.newId = this.lastIncident.id + 1;
  }

  getNumberOfIncidentsForClient(clientId: number) {

    this.incidents.find(x => x.client.id === clientId);
    console.log(this.incidents);
  }

  addIncident(incident: Incident) {
    this.incidents.push(incident);
    this.incidentChanged.next(this.incidents.slice()) // emitting now as a subject type
  }

  updateIncident(index: number, newIncident: Incident) {
    this.incidents[index] = newIncident;
    this.incidentChanged.next(this.incidents.slice());
  }

  closeIncident(index: number) {
    this.incidents.splice(index, 1);
    this.incidentChanged.next(this.incidents.slice());
  }

}
