import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { IUfficiale } from '../../shared/interfaces';
import { filter, share, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UfficialiService {
  private API_BASE_URL = 'http://localhost:8000/api/v1/ufficiali';
  constructor(private http: HttpClient) { }

  caricaUfficiali() {
    return this.http.get<IUfficiale[]>(`${this.API_BASE_URL}`, {
      responseType: "json"
    }).pipe(
      shareReplay()
    );
  }

  aggiungiUfficiale(nuovoUfficiale: IUfficiale) {
    return this.http.post<IUfficiale>(this.API_BASE_URL, nuovoUfficiale).pipe(
      shareReplay()
    )
  }
}
