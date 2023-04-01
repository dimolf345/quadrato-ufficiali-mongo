import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FooterComponent } from './layout/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { ResponseInterceptor } from './response.interceptor';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [MaterialModule, HttpClientModule],
  exports: [HeaderComponent, FooterComponent],
  providers: [ApiService, {
    provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true
  }],
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
