import { Injectable, signal } from '@angular/core';
import { Entry } from '../models/entry';

@Injectable({
  providedIn: 'root'
})
export class EntryServiceService {
  private entryList = signal<Entry[]>([{
    title: "Hello",
    descr: "World"
  }, {
    title: "Welcome",
    descr: "To the interview"
  }]);

  readonly entries = this.entryList.asReadonly();

  constructor() { }

  push (e: Entry) {
    this.entryList.update(v => [...v, e])
  }

}
