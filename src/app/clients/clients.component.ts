import { Component, OnInit } from '@angular/core';
import {Client} from "./client.model";
import {ClientService} from "./client.service";
import {Subscription} from "rxjs";
import {Incident} from "../incidents/incident.model";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers: [ ClientService ]
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  incidents: Incident[];
  private subscription: Subscription;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clients = this.clientService.getClients();
    this.subscription = this.clientService.clientChanged
      .subscribe(
        (clients: Client []) => {
          this.clients = clients;
        }
      )

  }

}
