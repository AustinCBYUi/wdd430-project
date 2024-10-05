import { Component } from '@angular/core';
import {MessageItemComponent} from "../message-item/message-item.component";
import {MessageEditComponent} from "../message-edit/message-edit.component";
import { Message } from "../message.model";
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
  messages: Message[] = [
    new Message('1', 'Hello', 'This is a test message', 'David'),
    new Message('2', 'Reminder!!', 'Make sure to complete your work early!', 'Austin')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
