import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {ContactDetailComponent} from "./contacts/contact-detail/contact-detail.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {ContactListComponent} from "./contacts/contact-list/contact-list.component";
import {HeaderComponent} from "./header.component";
import {DocumentsComponent} from "./documents/documents.component";
import {MessageListComponent} from "./messages/message-list/message-list.component";
import {NgIf} from "@angular/common";
import { DragDropModule } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ContactDetailComponent,
    ContactsComponent,
    ContactListComponent,
    HeaderComponent,
    DocumentsComponent,
    MessageListComponent,
    NgIf,
    RouterModule,
    RouterOutlet,
    DragDropModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title!: 'wdd430-project'
}
