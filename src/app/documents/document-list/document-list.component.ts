import { Component, OnInit } from '@angular/core';
import {DocumentItemComponent} from "../document-item/document-item.component";
import { Documents } from '../documents.model';
import {NgForOf} from "@angular/common";
import {DocumentService} from "../document.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [
    DocumentItemComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  document: Documents[] = [];

  constructor(private documentService: DocumentService) {
    this.document = this.documentService.getDocuments();
  }

  ngOnInit() {
    this.document = this.documentService.document;
    this.documentService.documentChangedEvent.subscribe((documents: Documents[]) => {
      this.document = documents;
    });
  }
}
