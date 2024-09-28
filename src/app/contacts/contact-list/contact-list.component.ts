import { Component, OnInit } from '@angular/core';

import { Contacts } from '../contacts.model';
import {ContactDetailComponent} from "../contact-detail/contact-detail.component";
//Video didn't have an import for this, so I sat here for an hour trying to figure out why my list wasn't
//displaying..
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    ContactDetailComponent,
    NgFor
  ], //Hello
  templateUrl: 'contact-list.component.html',
  styleUrl: 'contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  contact: Contacts[] = [
    new Contacts('1', 'Austin Campbell', 'cam23021@byui.edu', '6022955366',
      'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'),
    new Contacts('2', "Jessi Campbell", 'campbelljessib@gmail.com', '4804907712', 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'),
    new Contacts('3', 'Bro. Jackson', 'brotherjackson@gmail.com', '1343199', '/Images/jacksonk.jpg'),
    new Contacts('4', 'Bro. Barzee', 'brotherbarzee@gmail.com', '95149591', '/Images/barzeer.jpg')
  ];

  constructor() { }

  ngOnInit() {

  }

}
