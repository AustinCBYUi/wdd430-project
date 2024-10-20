import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Contacts } from '../contacts.model';
import {ContactDetailComponent} from "../contact-detail/contact-detail.component";
import { ContactService } from "../contact.service";
//Video didn't have an import for this, so I sat here for an hour trying to figure out why my list wasn't
//displaying..
import { NgFor } from '@angular/common';
import {ContactItemComponent} from "../contact-item/contact-item.component";



@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    ContactDetailComponent,
    NgFor,
    ContactItemComponent
  ], //Hello
  templateUrl: 'contact-list.component.html',
  styleUrl: 'contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  contacts: Contacts[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  onSelectContact(contact: Contacts): void {
    this.contactService.selectedContactEvent.emit(contact);
  }

}
