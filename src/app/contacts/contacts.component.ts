import { Component } from '@angular/core';
import {ContactDetailComponent} from "./contact-detail/contact-detail.component";
import {ContactListComponent} from "./contact-list/contact-list.component";
import {Contacts} from "./contacts.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    ContactDetailComponent,
    ContactListComponent,
    NgIf
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  selectedContact!: Contacts;
}
