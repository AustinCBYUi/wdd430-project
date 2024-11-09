import {Component, OnInit} from '@angular/core';
import {Contacts} from '../contacts.model';
import {ContactService} from "../contact.service";
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule, NgForm} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ContactItemComponent} from "../contact-item/contact-item.component";
import {CdkDragDrop, CdkDropList} from "@angular/cdk/drag-drop";
import {group} from "@angular/animations";

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ContactItemComponent,
    CdkDropList,
    NgForOf
  ],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  contact: Contacts = { id: '', name: '', email: '', phone: '', imageUrl: '', group: [] };
  originalContact!: Contacts | null;
  groupContacts: Contacts[] = [];
  isInEdit: boolean = false;
  id!: string;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (!this.id) {
        this.isInEdit = false;
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact) {
        return;
      }

      this.isInEdit = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.originalContact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
      }
    });
  }

  onDrop(event: CdkDragDrop<Contacts[]>) {
    const draggedContact = event.item.data;
    if (draggedContact && !this.groupContacts.includes(draggedContact)) {
      this.groupContacts.push(draggedContact);
    }
  }

  isInGroup(contact: Contacts): boolean {
    return this.groupContacts.some((groupContact) => groupContact.id === contact.id);
  }

  addContactToGroup(contact: Contacts) {
    this.groupContacts.push(contact);
  }

  removeContactFromGroup(contact: Contacts) {
    this.groupContacts = this.groupContacts.filter(contact => this.contact.id !== this.contact.id);
  }

  generateNewId(): string {
    return Math.random().toString(36).slice(1, 9999);
  }

  onSubmit(form: NgForm) {
    const formValues = form.value;

    const newContact = new Contacts(
      this.contact?.id || this.generateNewId(),
      formValues.name,
      formValues.email,
      formValues.phone,
      formValues.imageUrl,
    )

    if (this.isInEdit) {
      if (this.originalContact) {
        this.contactService.updateContact(this.originalContact, newContact);
      }
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']).then(() => {
      console.log("Contact created");
    });

    if (form.invalid) return;

    form.resetForm();
  }

  onCancel(): void {
    this.router.navigate(['/contacts']).then(() => {
      console.log("Cancelled");
    })
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


  protected readonly group = group;
}
