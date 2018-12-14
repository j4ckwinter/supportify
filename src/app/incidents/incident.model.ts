import {Client} from "../clients/client.model";

export class Incident {
  public id: number;
  public title: string;
  public description: string;
  public priority: number;
  public status: string;
  public client: Client;

  constructor(id: number, title: string, description: string, priority: number, status: string, client: Client) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.client = client;
  }
}
