import { Component } from '@angular/core';
import {ContactDetailComponent} from "./contact-detail/contact-detail.component";
import {ContactListComponent} from "./contact-list/contact-list.component";
import {Contacts} from "./contacts.model";
import { ContactService } from './contact.service';
import {NgIf} from "@angular/common";
import { RouterOutlet, RouterModule } from "@angular/router";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    ContactDetailComponent,
    ContactListComponent,
    NgIf,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  selectedContact!: Contacts | null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.selectedContactEvent.subscribe((contact: Contacts) => {
      this.selectedContact = contact;
    });
  }
}
