import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf } from "@angular/common";
import { Contacts } from "../contacts.model";
import { RouterLink, RouterLinkActive, RouterModule } from "@angular/router";

@Component({
  selector: 'app-contact-item',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    RouterModule
  ],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
  @Input() contact!: Contacts;
  @Output() contactSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {

  }

  onSelected() {
    this.contactSelected.emit();
  }

}
