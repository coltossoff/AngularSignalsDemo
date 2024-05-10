import { DestroyRef, Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Entry } from '../models/entry';
import { HttpService } from './http.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class EntryServiceService {
  private entryList: WritableSignal<Entry[]> = signal([]);

  readonly entries = this.entryList.asReadonly();

  constructor(private service: HttpService, private destroyRef: DestroyRef) {
  }

  push (e: Entry) {
    e.createdAt = new Date();
    let r = this.service.add(e).subscribe(res => this.entryList.update(v => [e, ...v]));
    this.destroyRef.onDestroy(() => r.unsubscribe());
  }

  load () {
    let r = this.service.getAll().subscribe(v => this.entryList.set(v));
    this.destroyRef.onDestroy(() => r.unsubscribe());
  }
}
