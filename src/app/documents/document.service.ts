import { Injectable, EventEmitter } from '@angular/core';
import { Documents } from "./documents.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import {Contacts} from "../contacts/contacts.model";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  document: Documents[] = [];
  documentSelectedEvent = new EventEmitter<Documents>();
  documentChangedEvent = new EventEmitter<Documents[]>();

  constructor() {
    this.document = MOCKDOCUMENTS;
  }

  getDocuments(): Documents[] {
    return this.document.slice();
  }

  getDocument(id: string): Documents | null {
    return this.document.find(document => document.id === id) || null;
  }

  deleteDocument(document: Documents) {
    if (!document) {
      return;
    }
    const pos = this.document.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.document.splice(pos, 1);
    this.documentChangedEvent.emit(this.document.slice());
  }
}
