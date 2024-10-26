import { Component } from '@angular/core';
import {DocumentListComponent} from "./document-list/document-list.component";
import {DocumentDetailComponent} from "./document-detail/document-detail.component";
import { Documents } from './documents.model';
import {NgIf} from "@angular/common";
import {DocumentService} from "./document.service";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    DocumentListComponent,
    DocumentDetailComponent,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  selectedDocument!: Documents | null;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.documentSelectedEvent.subscribe((selectedDocument: Documents) => {
      this.selectedDocument = selectedDocument;
    });
  }
}
