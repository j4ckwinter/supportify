import {Client} from "./client.model";

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


  constructor(clients: Client[]) {
    this.clients = clients;
  }

  getClients() {
    return this.clients.slice();
  }

  getClient(index: number) {
    return this.clients[index];
  }

}
