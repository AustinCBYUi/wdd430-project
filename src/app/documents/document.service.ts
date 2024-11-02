import { Injectable, EventEmitter } from '@angular/core';
import { Documents } from "./documents.model";
import { Subject } from "rxjs";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  document: Documents[] = [];
  documentSelectedEvent = new EventEmitter<Documents>();
  documentChangedEvent = new EventEmitter<Documents[]>();
  documentListChangedEvent = new Subject<Documents[]>();
  maxDocumentId!: number;

  constructor() {
    this.document = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  addDocument(newDocument: Documents) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();

    this.document.push(newDocument);

    const documentsListClone = this.document.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }


  updateDocument(originalDocument: Documents, newDocument: Documents) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const position = this.document.indexOf(originalDocument);
    if (position < 0) {
      return;
    }

    newDocument.id = originalDocument.id;

    this.document[position] = newDocument;

    const documentsListClone = this.document.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }


  deleteDocument(document: Documents) {
    if (!document) {
      return;
    }

    const position = this.document.indexOf(document);
    if (position < 0) {
      return;
    }

    this.document.splice(position, 1);

    const documentsListClone = this.document.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }


  getDocuments(): Documents[] {
    return this.document.slice();
  }

  getDocument(id: string): Documents | null {
    return this.document.find(document => document.id === id) || null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.document) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
