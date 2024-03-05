import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-entry-item',
  templateUrl: './entry-item.component.html',
  styleUrls: ['./entry-item.component.css']
})
export class EntryItemComponent {
  @Input('title') title: string | undefined;
  @Input('descr') descr: string | undefined;
}
