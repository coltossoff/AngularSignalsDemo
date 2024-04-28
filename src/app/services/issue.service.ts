import { Injectable } from '@angular/core';
import { Entry } from '../models/entry';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) { }

  addIssue(i: Entry): Observable<Entry> {
    return this.http.post<Entry>('/issue', i);
  }

  getAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>('/issue');
  }

  getLatest(d: Date): Observable<Entry[]> {
    return this.http.get<Entry[]>('/issue/{d}');
  }
}
