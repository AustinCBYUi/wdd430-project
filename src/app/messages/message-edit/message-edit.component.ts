import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Message } from "../message.model";

@Component({
  selector: 'app-message-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('subject') subjectInputRef!: ElementRef;
  @ViewChild('msgText') msgTextInputRef!: ElementRef;

  @Output() messagesAdded = new EventEmitter<Message>();

  currentSender = "Austin";

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    let id = Math.floor(Math.random()).toString();

    const newMessage = new Message(id, subject, msgText, this.currentSender);

    this.messagesAdded.emit(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
