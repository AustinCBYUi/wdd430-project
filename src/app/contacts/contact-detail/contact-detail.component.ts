import {Component, Input} from '@angular/core';
import {Contacts} from "../contacts.model";

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  @Input() contact!: Contacts;

}
