import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entry } from '../models/entry';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>('/entries');
  }

  add(e: Entry): Observable<void> {
    return this.http.post<void>('/entry', e);
  }
}
