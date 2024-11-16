import { Component, OnInit } from '@angular/core';
import {MessageItemComponent} from "../message-item/message-item.component";
import {MessageEditComponent} from "../message-edit/message-edit.component";
import { Message } from "../message.model";
import { MessagesService } from "../messages.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [
    MessageItemComponent,
    MessageEditComponent,
    NgForOf
  ],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [];

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.messageService.getMessages();

    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    })
  }
}
