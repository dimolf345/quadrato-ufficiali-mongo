import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, filter, map, switchMap, tap, throwError } from 'rxjs';
import { AppState } from '../ngrx/store/AppState';
import { Store } from '@ngrx/store';
import * as fromUI from '../ngrx/store/actions/ui.actions'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((eventError: HttpErrorResponse) => {
        const { message } = eventError.error.error
        this.store.dispatch(fromUI.visualizzaErrore({
          errore: message
        }))
        return throwError(() => message)
      })
    )
  }
}
