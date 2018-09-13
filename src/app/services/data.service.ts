import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseApiUrl = 'https://api.opendota.com/api';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(urlExtention: string): Observable<any> {
    return this.http.get(`${baseApiUrl}/${urlExtention}`);
  }
}
