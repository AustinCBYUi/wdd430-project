import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf } from "@angular/common";
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
  @Output() msgSelected = new EventEmitter();

  onSelected() {
    this.msgSelected.emit();
  }
}
