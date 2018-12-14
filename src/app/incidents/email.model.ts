export class Email {

  public id: number;
  public subject: string;
  public date: string;
  public content: string;

  constructor(id: number, subject: string, date: string, content: string) {
    this.id = id;
    this.subject = subject;
    this.date = date;
    this.content = content;
  }
}
