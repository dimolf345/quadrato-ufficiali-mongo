import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './layout/header/header.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FooterComponent } from './layout/footer/footer.component';
import { ResponseInterceptor } from './response.interceptor';
import { UfficialiService } from './api/ufficiali.service';
import { ufficialiFeature } from '../ngrx/store/reducers/ufficiali.reducer';
import { EffectsModule } from '@ngrx/effects'
import { UfficialiEffects } from '../ngrx/effects/ufficiali.effects';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [MaterialModule, HttpClientModule, StoreModule.forFeature(ufficialiFeature), EffectsModule.forFeature(UfficialiEffects)],
  exports: [HeaderComponent, FooterComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true
  },
    UfficialiService
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
