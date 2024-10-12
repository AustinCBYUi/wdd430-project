import { Component, EventEmitter, Output } from '@angular/core';
import {DocumentItemComponent} from "../document-item/document-item.component";
import { Documents } from '../documents.model';
import {NgForOf} from "@angular/common";

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
  document: Documents[] = [
    new Documents('1', 'CSE220C - C++ Language', 'Learn how to develop using the C++ algorithms library.', 'https://test.com/doc1', []),
    new Documents('2', 'WDD430 - Full stack Web Dev', 'Begin work on the documents section of the CMS.', 'https://test.com/doc2', []),
    new Documents('3', 'CSE330 - .NET Framework', 'Further enhance your skills in C# and the .NET framework.', 'https://test.com/doc3', []),
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Documents>();

  onSelectedDocument(document: Documents) {
    this.selectedDocumentEvent.emit(document);
  }
}
