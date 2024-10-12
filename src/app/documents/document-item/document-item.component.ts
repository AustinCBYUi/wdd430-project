import { Component, Input } from '@angular/core';
import { Documents } from '../documents.model';

@Component({
  selector: 'app-document-item',
  standalone: true,
  imports: [],
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {
  @Input() document!: Documents;
}
