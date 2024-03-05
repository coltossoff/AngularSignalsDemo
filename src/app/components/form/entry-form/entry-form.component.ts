import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Entry } from 'src/app/models/entry';
import { EntryServiceService } from 'src/app/services/entry-service.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent {
  @ViewChild('#title', {read: ElementRef<HTMLInputElement>}) title!: ElementRef<HTMLInputElement>;
  newEntry = new FormGroup({
    title: new FormControl(''),
    descr: new FormControl('')
  });

  constructor(private service: EntryServiceService) { }

  add() {
    this.service.push(<Entry>this.newEntry.value);
    this.newEntry.controls.title.setValue('');
    this.newEntry.controls.descr.setValue('');
    // this.title.nativeElement.focus();
  }

}
