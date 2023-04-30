import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IMovimento } from "src/app/shared/interfaces/movimento";
import { Observable, share, shareReplay } from "rxjs";


@Injectable()
export class MovimentiService {
  private API_BASE_URL = 'http://localhost:8000/api/v1/movimenti';

  constructor(private http: HttpClient) {

  }

  caricaMovimenti() {
    return this.http.get<IMovimento[]>(`${this.API_BASE_URL}`, {
      responseType: 'json'
    }).pipe(
      shareReplay()
    )
  }

  aggiungiMovimento(nuovoMovimento: Partial<IMovimento>) {
    return this.http.post<Partial<IMovimento>>(this.API_BASE_URL, nuovoMovimento).pipe(
      shareReplay()
    )
  }
}