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



@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    ContactDetailComponent,
    NgFor,
    ContactItemComponent,
    RouterLink,
    CdkDrag
  ], //Hello
  templateUrl: 'contact-list.component.html',
  styleUrl: 'contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contacts[] = [];
  subscription!: Subscription;

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contactsList: Contacts[]) => {
      this.contacts = contactsList;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
