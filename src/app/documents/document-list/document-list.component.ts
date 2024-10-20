import { Component, EventEmitter, Output } from '@angular/core';
import {DocumentItemComponent} from "../document-item/document-item.component";
import { Documents } from '../documents.model';
import {NgForOf} from "@angular/common";
import {DocumentService} from "../document.service";

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [
    DocumentItemComponent,
    NgForOf
  ],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  document: Documents[] = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.document = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Documents) {
    this.documentService.documentSelectedEvent.emit(document);
  }
}
