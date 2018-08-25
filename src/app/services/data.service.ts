import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'https://api.opendota.com/api/';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getProMatches(urlExtention: string): Observable<any> {
    return this.http.get(apiUrl + urlExtention);
  }
}
