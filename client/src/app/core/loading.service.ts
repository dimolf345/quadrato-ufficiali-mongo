import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false)

  loading$: Observable<boolean> = this.loadingSubject.asObservable()

  constructor() { }

  setSpinnerListener(obs$: Observable<boolean>) {
    // obs$.subscribe((value) => {
    //   if (value) this.loadingSubject.next(true)
    //   else this.loadingSubject.next(false)
    // })
    this.loading$ = obs$
  }

}
