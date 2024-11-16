import { Injectable, EventEmitter } from '@angular/core';
import { Contacts } from './contacts.model';
import { Subject } from 'rxjs';
import { MOCKCONTACTS } from "./MOCKCONTACTS";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contact: Contacts[] = [];
  contactsUrl = `https://abccms-95881-default-rtdb.firebaseio.com/contacts.json`;
  selectedContactEvent = new EventEmitter<Contacts>();
  contactChangedEvent = new EventEmitter<Contacts[]>();
  contactListChangedEvent = new Subject<Contacts[]>();
  maxContactId!: number;

  constructor(private http: HttpClient) {
    this.contact = [];
    this.maxContactId = this.getMaxId();
    this.getContacts();
  }

  storeContacts() {
    const contactsString = JSON.stringify(this.contact);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.contactsUrl, contactsString, { headers })
      .subscribe({
        next: () => {
          this.contactListChangedEvent.next(this.contact.slice());
        },
        error: (error: any) => {
          console.error('An error occurred while saving contacts:', error);
        }
      });
  }


  addContact(newContact: Contacts) {
    if (!newContact) { return; }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contact.push(newContact);
    this.storeContacts();

    // const contactsListClone = this.contact.slice();
    // this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contacts, newContact: Contacts) {
    if (!originalContact || !newContact) { return; }

    const position = this.contact.indexOf(originalContact);
    if (position < 0) { return; }

    newContact.id = originalContact.id;
    this.contact[position] = newContact;
    this.storeContacts();

    // const contactsListClone = this.contact.slice();
    // this.contactListChangedEvent.next(contactsListClone);
  }


  deleteContact(contact: Contacts) {
    if (!contact) { return; }

    const index = this.contact.indexOf(contact);
    if (index < 0) { return; }

    this.contact.splice(index, 1);
    this.storeContacts();

    // const contactsListClone = this.contact.slice();
    // this.contactListChangedEvent.next(contactsListClone);
  }


  getContacts() {
    this.http.get<Contacts[]>(this.contactsUrl)
      .subscribe({
        next: (response) => {
          this.contact = response;
          this.sortContacts();
        },
        error: (error: any) => {
          console.error('An error occurred: ', error);
        }
      })
  }

  getContact(id: string): Contacts | null {
    return this.contact.find(contact => contact.id === id) || null;
  }

  sortContacts(): void {
    this.maxContactId = this.getMaxId();
    this.contact.sort((a, b) => a.name.localeCompare(b.name));
    this.contactListChangedEvent.next(this.contact.slice());
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
