import { Injectable, EventEmitter } from '@angular/core';
import { Message } from "./message.model";
import { MOCKMESSAGES } from "./MOCKMESSAGES";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];
  messagesUrl = `https://abccms-95881-default-rtdb.firebaseio.com/messages.json`;
  messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId!: number;

  constructor(private http: HttpClient) {
    this.messages = [];
    this.maxMessageId = this.getMaxId();
    this.getMessages();
  }

  storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.messagesUrl, messagesString, { headers })
      .subscribe({
        next: () => {
          this.messageListChangedEvent.next(this.messages.slice());
        },
        error: (error: any) => {
          console.error('Error saving message from Firebase:', error);
        }
      });
  }

  getMessages() {
    this.http.get<Message[]>(this.messagesUrl)
      .subscribe({
        next: (response) => {
          this.messages = response;
          this.sortMessages();
        },
        error: (error: any) => {
          console.error('An error occurred:', error);
        }
      })
  }

  sortMessages(): void {
    this.messages.sort((a, b) => a.subject.localeCompare(b.subject))
    this.messageChangedEvent.next(this.messages.slice());
  }

  getMessage(id: string): Message | null {
    return this.messages.find(message => message.id === id) || null;
  }

  addMessage(newMessage: Message): void {
    if (!newMessage) {
      return;
    }

    newMessage.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<Message>(this.messagesUrl, newMessage, { headers: headers })
      .subscribe({
        next: (message) => {
          this.messages.push(message);
          this.sortMessages();
        }
      })

    // this.maxMessageId = this.getMaxId();
    // this.messages.push(message);
    // this.storeMessages();
    // this.messageListChangedEvent.next(this.messages.slice());
  }


  updateMessage(originalMessage: Message, updatedMessage: Message) {
    if (!originalMessage || !updatedMessage) return;

    updatedMessage.id = originalMessage.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.messagesUrl + originalMessage.id, updatedMessage, { headers: headers })
      .subscribe({
        next: () => {
          const index = this.messages.findIndex(m => m.id === originalMessage.id);
          if (index >= 0) this.messages[index] = updatedMessage;
          this.sortMessages();
        }
      })
  }


  deleteMessage(message: Message) {
    if (!message) return;

    const messageId = message.id;

    this.http.delete(this.messagesUrl + messageId)
      .subscribe({
        next: () => {
          this.messages = this.messages.filter(m => m.id !== messageId);
          this.sortMessages();
        }
      })
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
