import { Component, OnInit, OnDestroy } from '@angular/core';

import { Contacts } from '../contacts.model';
import { ContactDetailComponent } from "../contact-detail/contact-detail.component";
import { ContactService } from "../contact.service";
//Video didn't have an import for this, so I sat here for an hour trying to figure out why my list wasn't
//displaying.
import { NgFor } from '@angular/common';
import { ContactItemComponent } from "../contact-item/contact-item.component";
import { RouterLink } from "@angular/router";
import {Subscription} from "rxjs";
import {CdkDrag} from "@angular/cdk/drag-drop";
import {ContactsFilterPipe} from "../contacts-filter.pipe";



@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    ContactDetailComponent,
    NgFor,
    ContactItemComponent,
    RouterLink,
    CdkDrag,
    ContactsFilterPipe
  ], //Hello
  templateUrl: 'contact-list.component.html',
  styleUrl: 'contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contacts[] = [];
  subscription!: Subscription;
  term: string = '';

  constructor(private contactService: ContactService) {
  }

  search(value: string) {
    this.term = value;
  }

  ngOnInit() {
    this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contactsList: Contacts[]) => {
      this.contacts = contactsList;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
