import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, filter, map, tap } from 'rxjs';
import { AppState } from '../ngrx/store/AppState';
import { Store } from '@ngrx/store';
import * as fromUI from '../ngrx/store/actions/ui.actions'


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      filter((event: any) => event instanceof HttpResponse),
      map(
        (event: HttpResponse<any>) => {
          return event.clone({
            body: event.body.data
          })
        }
      )
    )
  }
}
