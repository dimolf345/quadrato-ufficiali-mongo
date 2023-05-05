import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './layout/header/header.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FooterComponent } from './layout/footer/footer.component';
import { ResponseInterceptor } from './response.interceptor';
import { UfficialiService } from './api/ufficiali.service';
import { ufficialiFeature } from '../ngrx/store/reducers/ufficiali.reducer';
import { EffectsModule } from '@ngrx/effects'
import { UfficialiEffects } from '../ngrx/effects/ufficiali.effects';
import { UIFeature } from '../ngrx/store/reducers/ui.reducer';
import { UIEffects } from '../ngrx/effects/ui.effects';
import { ErrorInterceptor } from './error.interceptor';
import { fondoFeature } from '../ngrx/store/reducers/fondo.reducer';
import { fondoEffects } from '../ngrx/effects/fondo.effects';
import { FondoService } from './api/fondo.service';
import { SnackbarService } from './snackbar.service';
import { MovimentiService } from './api/movimenti.service';
import { CurrencyPipe } from '@angular/common';
import { movimentiFeature } from '../ngrx/store/reducers/movimenti.reducer';
import { MovimentiEffects } from '../ngrx/effects/movimenti.effects';
import { LoadingService } from './loading.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [MaterialModule, SharedModule, HttpClientModule, StoreModule.forFeature(ufficialiFeature),
    StoreModule.forFeature(UIFeature),
    StoreModule.forFeature(fondoFeature),
    StoreModule.forFeature(movimentiFeature),
    EffectsModule.forFeature([UfficialiEffects, UIEffects, fondoEffects, MovimentiEffects])],
  exports: [HeaderComponent, FooterComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true
    },
    UfficialiService,
    FondoService,
    SnackbarService,
    MovimentiService,
    CurrencyPipe,
    LoadingService
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import in the AppModule only'
      );
    }
  }
}
