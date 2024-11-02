import { Component, OnInit } from '@angular/core';
import { Contacts } from '../contacts.model';
import { ContactService } from "../contact.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  contact!: Contacts | null;
  isInEdit: boolean = false;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.contact = this.contactService.getContact(id);
      this.isInEdit = !!this.contact;
    }
  }

  onSaveContact() {
    if (!this.contact) {
      console.error('Contact data is not available');
      return;
    }

    if (this.isInEdit) {
      this.contactService.updateContact(this.contact, { ...this.contact });
    } else {
      this.contactService.addContact(this.contact);
    }
    this.router.navigate(['/contacts']).then(() => {
      console.log('Contact Added');
    });
  }

  onDeleteContact() {
    if (this.isInEdit && this.contact) {
      this.contactService.deleteContact(this.contact);
      this.router.navigate(['/contacts']).then(() => {
        console.log('Contact Deleted');
      })
    }
  }


}
