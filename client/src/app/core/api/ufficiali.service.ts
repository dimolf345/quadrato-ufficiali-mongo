import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUfficiale } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UfficialiService {
  private API_BASE_URL = 'http://localhost:8000/api/v1/ufficiali';
  constructor(private http: HttpClient) { }

  caricaUfficiali() {
    return this.http.get<IUfficiale[]>(`${this.API_BASE_URL}/ufficiali`, {
      responseType: "json"
    });
  }
}
