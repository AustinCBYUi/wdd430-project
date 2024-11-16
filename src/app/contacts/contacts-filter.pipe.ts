import { Pipe, PipeTransform } from '@angular/core';
import { Contacts } from "./contacts.model";

@Pipe({
  name: 'contactsFilter',
  standalone: true
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contact: Contacts[], term: string): Contacts[] {
    let filteredContacts: Contacts[] = [];

    if (term && term.length > 0) {
      filteredContacts = contact.filter(
        (contact: Contacts) => contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }
    return filteredContacts.length > 0 ? filteredContacts : contact;
  }

}
