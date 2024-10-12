import { Component } from '@angular/core';
import {DocumentListComponent} from "./document-list/document-list.component";
import {DocumentDetailComponent} from "./document-detail/document-detail.component";
import { Documents } from './documents.model';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    DocumentListComponent,
    DocumentDetailComponent,
    NgIf
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  selectedDocument!: Documents;

  onDocumentSelected(document: Documents) {
    this.selectedDocument = document;
  }
}
