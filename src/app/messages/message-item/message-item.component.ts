import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgForOf } from "@angular/common";
import { ContactService } from "../../contacts/contact.service";
import { Contacts } from "../../contacts/contacts.model";
import { Message } from "../message.model";

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  @Input() message!: Message;
  messageSender!: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    const contact: Contacts | null = this.contactService.getContact(this.message.sender);

    if (contact) {
      this.messageSender = contact.name;
    } else {
      this.messageSender = 'Unknown';
    }
  }
}
