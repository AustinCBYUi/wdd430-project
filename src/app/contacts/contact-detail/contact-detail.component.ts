import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { ContactService } from "../contact.service";
import { Contacts } from "../contacts.model";

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  contact!: Contacts | null;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.contact = this.contactService.getContact(id);
    });
  }

  onDelete() {
    if (this.contact) {
      this.contactService.deleteContact(this.contact);
      this.router.navigate(['/contacts']).then(() => {
        console.log('Contact Deleted');
      }).catch((error) => {
        console.error('Navigation Error: ', error);
      });
    }
  }

}
