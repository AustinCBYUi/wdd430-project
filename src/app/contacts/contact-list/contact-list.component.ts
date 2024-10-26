import {Component, OnInit} from '@angular/core';

import { Contacts } from '../contacts.model';
import {ContactDetailComponent} from "../contact-detail/contact-detail.component";
import { ContactService } from "../contact.service";
//Video didn't have an import for this, so I sat here for an hour trying to figure out why my list wasn't
//displaying.
import { NgFor } from '@angular/common';
import {ContactItemComponent} from "../contact-item/contact-item.component";
import {RouterLink} from "@angular/router";



@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    ContactDetailComponent,
    NgFor,
    ContactItemComponent,
    RouterLink
  ], //Hello
  templateUrl: 'contact-list.component.html',
  styleUrl: 'contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  contacts: Contacts[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.contact;

    this.contactService.contactChangedEvent.subscribe((contacts: Contacts[]) => {
      this.contacts = contacts;
    })
  }
}
