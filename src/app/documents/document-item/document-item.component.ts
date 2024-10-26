import { Component, Input } from '@angular/core';
import { Documents } from '../documents.model';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-document-item',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {
  @Input() document!: Documents;
}
