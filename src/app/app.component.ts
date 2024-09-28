import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ContactDetailComponent} from "./contacts/contact-detail/contact-detail.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {ContactListComponent} from "./contacts/contact-list/contact-list.component";
import {HeaderComponent} from "./header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactDetailComponent, ContactsComponent, ContactListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wdd430-project';
}
