import { Injectable, WritableSignal, signal } from '@angular/core';
import { Entry } from '../models/entry';

@Injectable({
  providedIn: 'root'
})
export class EntryServiceService {
  entries = signal<Entry[]>([{
    title: "Hello",
    descr: "World"
  }, {
    title: "Welcome",
    descr: "To the interview"
  }]);

  constructor() { }

  push (e: Entry) {
    this.entries.update(v => [...v, e])
  }

}
