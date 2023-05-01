import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { IFondo } from 'src/app/shared/interfaces/fondo';

@Injectable({
  providedIn: 'root'
})
export class FondoService {
  private API_BASE_URL = 'http://localhost:8000/api/v1/fondo'

  constructor(private http: HttpClient) { }

  caricaFondo(): Observable<IFondo> {
    return this.http.get<IFondo>(`${this.API_BASE_URL}`, {
      responseType: "json"
    }).pipe(
      shareReplay()
    )
  }
}
