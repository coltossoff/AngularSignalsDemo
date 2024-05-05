import { Injectable, signal } from '@angular/core';
import { Entry } from '../models/entry';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EntryServiceService {
  private entryList = signal<Entry[]>([{
    title: "test",
    descr: "dummy"
  }]);

  readonly entries = this.entryList.asReadonly();

  constructor(private service: HttpService) {
    service.getAll().subscribe(res => this.entryList.update(v => res));
  }

  push (e: Entry) {
    // this.entryList.update(v => [...v, e])
    this.service.add(e).subscribe(res => {
      console.log(res)
      this.service.getAll().subscribe(r => this.entryList.update(v => r));
    })
  }

}
