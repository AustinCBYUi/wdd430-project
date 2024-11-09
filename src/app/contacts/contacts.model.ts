export class Contacts {
  public id: string = Math.random().toString(36).slice(2, 8);
  public name: string;
  public email: string;
  public phone: string;
  public imageUrl: string;
  public group: Contacts[] | null | undefined;

  constructor(id: string, name: string, email: string, phone: string, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.group = [];
  }
}
