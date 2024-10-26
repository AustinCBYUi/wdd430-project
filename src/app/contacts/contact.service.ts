import { Injectable, EventEmitter } from '@angular/core';
import { Contacts } from './contacts.model';
import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contact: Contacts[] = [];
  selectedContactEvent = new EventEmitter<Contacts>();
  contactChangedEvent = new EventEmitter<Contacts[]>();

  constructor() {
    this.contact = MOCKCONTACTS;
  }

  getContacts(): Contacts[] {
    return this.contact.slice();
  }

  getContact(id: string): Contacts | null {
    for (let contact of this.contact) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contacts) {
    const index = this.contact.indexOf(contact);
    if (index !== -1) {
      this.contact.splice(index, 1);
      this.contactChangedEvent.emit(this.contact);
    }
  }
}