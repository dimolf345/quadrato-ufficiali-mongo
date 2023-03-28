import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [MaterialModule],
  exports: [HeaderComponent, FooterComponent],
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
