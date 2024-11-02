import { Component, OnInit } from '@angular/core';
import { Documents } from "../documents.model";
import { DocumentService } from "../document.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-document-edit',
  standalone: true,
  imports: [],
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent {
  document!: Documents | null;
  isInEdit: boolean = false;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.document = this.documentService.getDocument(id);
      this.isInEdit = !!this.document;
    }
  }

  onSaveDocument() {
    if (!this.document) {
      console.error('Document data is not available');
      return;
    }

    if (this.isInEdit) {
      this.documentService.updateDocument(this.document, { ...this.document });
    } else {
      this.documentService.addDocument(this.document);
    }
    this.router.navigate(['/documents']).then(() => {
      console.log('Document added');
    });
  }

  onDeleteDocument() {
    if (this.isInEdit && this.document) {
      this.documentService.deleteDocument(this.document);
      this.router.navigate(['/documents']).then(() => {
        console.log('Document Deleted');
      })
    }
  }
}
