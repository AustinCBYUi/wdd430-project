import { Component, OnInit, OnDestroy } from '@angular/core';
import {DocumentItemComponent} from "../document-item/document-item.component";
import { Documents } from '../documents.model';
import {NgForOf} from "@angular/common";
import {DocumentService} from "../document.service";
import {RouterLink} from "@angular/router";
import { Subscription } from "rxjs";

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
export class DocumentListComponent implements OnInit, OnDestroy {
  document: Documents[] = [];
  subscription!: Subscription;

  constructor(private documentService: DocumentService) {
  }

  ngOnInit() {
    this.documentService.getDocuments()
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documents) => {
      this.document = documents;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
