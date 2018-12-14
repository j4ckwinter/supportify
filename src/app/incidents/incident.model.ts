import {Client} from "../clients/client.model";
import {Email} from "./email.model";

export class Incident {
  public id: number;
  public title: string;
  public description: string;
  public priority: number;
  public status: string;
  public client: Client;
  public emails: Email;

  constructor(id: number, title: string, description: string, priority: number, status: string, client: Client, emails: Email) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.client = client;
    this.emails = emails;
  }
}
