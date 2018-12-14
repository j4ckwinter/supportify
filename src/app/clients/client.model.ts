export class Client {
  public id: number;
  public name: string;
  public region: string;

  constructor(id: number, name: string, region: string) {
    this.id = id;
    this.name = name;
    this.region = region;
  }
}
