import {Client} from "./client.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {IncidentsService} from "../incidents/incidents.service";

@Injectable()
export class ClientService {
  private clients: Client[] = [
    new Client(
      1,
      'ABN',
      'Netherlands'
    ),
    new Client(
      2,
      'Mizuho',
      'Japan'
    )
  ]

  clientChanged = new Subject<Client[]>();

  constructor(private incidentsService: IncidentsService) {
  }

  getClients() {
    return this.clients.slice();
  }

  getClient(index: number) {
    return this.clients[index];
  }

}
