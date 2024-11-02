import { Injectable, EventEmitter } from '@angular/core';
import { Contacts } from './contacts.model';
import { Subject } from 'rxjs';
import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contact: Contacts[] = [];
  selectedContactEvent = new EventEmitter<Contacts>();
  contactChangedEvent = new EventEmitter<Contacts[]>();
  contactListChangedEvent = new Subject<Contacts[]>();
  maxContactId!: number;

  constructor() {
    this.contact = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }


  addContact(newContact: Contacts) {
    if (!newContact) { return; }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contact.push(newContact);

    const contactsListClone = this.contact.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contacts, newContact: Contacts) {
    if (!originalContact || !newContact) { return; }

    const position = this.contact.indexOf(originalContact);
    if (position < 0) { return; }

    newContact.id = originalContact.id;
    this.contact[position] = newContact;

    const contactsListClone = this.contact.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }


  deleteContact(contact: Contacts) {
    if (!contact) { return; }

    const index = this.contact.indexOf(contact);
    if (index < 0) { return; }

    this.contact.splice(index, 1);

    const contactsListClone = this.contact.slice();
    this.contactListChangedEvent.next(contactsListClone);
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


  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contact) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
