import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IncidentsService} from "../incidents/incidents.service";

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private incidentService: IncidentsService) {
  }

  storeIncidents() {
    return this.http.put('https://supportify-http.firebaseio.com/incidents.json', this.incidentService.getIncidents());
  }
}
