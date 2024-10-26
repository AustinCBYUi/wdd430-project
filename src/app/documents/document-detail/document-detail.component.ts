import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink, Router } from '@angular/router';
import { DocumentService } from "../document.service";
import { Documents } from '../documents.model';
import { WindRefService } from "../../wind-ref.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-document-detail',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
    documentDetail!: Documents | null;
    nativeWindow: any;

    constructor(
      private windRef: WindRefService,
      private documentService: DocumentService,
      private route: ActivatedRoute,
      private router: Router
    ) {}

  ngOnInit() {
      this.nativeWindow = this.windRef.getNativeWindow();
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.documentDetail = this.documentService.getDocument(id);
      });
  }

  onView() {
      const url = this.documentDetail?.url;
      if (url) {
        this.nativeWindow.open(url);
      }
  }

  onDelete() {
      if (this.documentDetail) {
        this.documentService.deleteDocument(this.documentDetail);
        this.router.navigate(['/documents']).then(() => {
          console.log('Document deleted');
        }).catch((error) => {
          console.error('Navigation Error: ', error);
        });
      }
  }
}
