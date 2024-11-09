import { Component, OnInit } from '@angular/core';
import { Documents } from "../documents.model";
import { DocumentService } from "../document.service";
import { ActivatedRoute, Router } from "@angular/router";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-document-edit',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  document: Documents = { id: '', name: '', description: '', url: '', children: [] };
  originalDocument: Documents | null = null;
  isInEdit: boolean = false;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        this.isInEdit = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(id);
      if (!this.originalDocument) {
        return;
      }
      this.isInEdit = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: NgForm) {
    const formValues = form.value;

    const newDocument = new Documents(
      this.document.id,
      formValues.name,
      formValues.description,
      formValues.url,
      []
    );

    if (this.isInEdit) {
      if (this.originalDocument) {
        this.documentService.updateDocument(this.originalDocument, newDocument)
      }
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']).then(() => {
      console.log("Document submitted");
    });

    if (form.invalid) return;

    form.resetForm();
  }

  onCancel(): void {
    this.router.navigate(['/documents']).then(() => {
      console.log("Cancelled");
    });
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
