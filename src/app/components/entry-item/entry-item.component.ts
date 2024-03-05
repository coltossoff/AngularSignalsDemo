import { input } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-entry-item',
  templateUrl: './entry-item.component.html',
  styleUrls: ['./entry-item.component.css']
})
export class EntryItemComponent {
  title = input.required<string>();
  descr = input.required<string>();
}
