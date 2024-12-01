import {EventEmitter, inject, Injectable} from '@angular/core';
import {Documents} from "./documents.model";
import {BehaviorSubject, Subject} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  document: Documents[] = [];
  documentsUrl = 'http://localhost:3000/documents'; //`https://abccms-95881-default-rtdb.firebaseio.com/documents.json`;
  documentSelectedEvent = new EventEmitter<Documents>();
  documentChangedEvent = new BehaviorSubject<Documents[]>([]);
  documentListChangedEvent = new Subject<Documents[]>();
  maxDocumentId!: number;


  constructor(private http: HttpClient) {
    this.document = [];
    this.maxDocumentId = this.getMaxId();
    this.getDocuments();
  }


  async getDocuments() {
    this.http.get<Documents[]>(this.documentsUrl)
      .subscribe({
        next: (response) => {
          this.document = response;
          this.sortSend();
        },
        error: (error: any) => {
          console.error('An error occurred:', error);
        }
      });
  }


  storeDocuments(): void {
    const documentsJson = JSON.stringify(this.document);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.documentsUrl, documentsJson, { headers })
      .subscribe({
        next: () => {
          this.documentListChangedEvent.next(this.document.slice());
        },
        error: (error: any) => {
          console.error('Error saving document list to Firebase:', error);
        }
      });
  }

  sortSend(): void {
    this.maxDocumentId = this.getMaxId();
    this.document.sort((a, b) => a.name.localeCompare(b.name));
    this.documentListChangedEvent.next(this.document.slice());
  }


  async addDocument(newDocument: Documents) {
    if (!newDocument) {
      return;
    }

    newDocument.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: String, document: Documents }>(this.documentsUrl, newDocument, { headers: headers })
      .subscribe(
        response => {
          this.document.push(response.document);
          this.sortSend();
        }
      );

    // this.maxDocumentId++;
    // newDocument.id = this.maxDocumentId.toString();
    //
    // this.document.push(newDocument);
    // this.storeDocuments();

    // const documentsListClone = this.document.slice();
    // this.documentListChangedEvent.next(documentsListClone);
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

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.documentsUrl, newDocument, { headers: headers })
    .subscribe({
      next: () => {
        this.document[position] = newDocument;
        this.sortSend();
      },
      error: (err) => console.error('Error updating document: ', err)
    });

    // newDocument.id = originalDocument.id;
    //
    // this.document[position] = newDocument;
    // this.storeDocuments();

    // const documentsListClone = this.document.slice();
    // this.documentListChangedEvent.next(documentsListClone);
  }


  deleteDocument(document: Documents) {
    if (!document) {
      return;
    }

    const documentId = document.id;

    this.http.delete(this.documentsUrl + documentId)
      .subscribe({
        next: () => {
          this.document = this.document.filter(d => d.id !== documentId);
          this.sortSend();
        },
        error: (err) => console.error('Error deleting document: ', err)
      });

    // const position = this.document.indexOf(document);
    // if (position < 0) {
    //   return;
    // }
    //
    // this.document.splice(position, 1);
    // this.storeDocuments();

    // const documentsListClone = this.document.slice();
    // this.documentListChangedEvent.next(documentsListClone);
  }




  getDocument(id: string): Documents | null {
    return this.document.find(document => document.id === id) || null;
  }

  getMaxId(): number {
    return this.document.reduce((max, doc) => {
      const docId = parseInt(doc.id, 10);
      return docId > max ? docId : max;
    }, 0);
  }
}
