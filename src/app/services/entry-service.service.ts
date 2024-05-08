import { Injectable, signal } from '@angular/core';
import { Entry } from '../models/entry';
import { HttpService } from './http.service';

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

  constructor(private service: HttpService) { }

  push (e: Entry) {
    this.entryList.update(v => [...v, e])
  }

  load () {
    this.service.getAll().subscribe(res => {
      this.entryList.update(u => res);
    })
  }
}
