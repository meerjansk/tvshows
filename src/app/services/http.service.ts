import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient 
  ) { }
  // Call Http Get and pass URL parameter to fetch response from API
  get(url: string) {
    return this.http.get(url);
  }
}
