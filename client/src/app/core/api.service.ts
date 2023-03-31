import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_BASE_URL = 'http://localhost:8000/api/v1';
  constructor(private http: HttpClient) {}

  getOfficer() {
    return this.http.get(`${this.API_BASE_URL}/ufficiali`);
  }
}
