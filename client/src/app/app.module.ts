import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { RouterStateSerializer, StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomSerializer } from './ngrx/router/custom-route-serializer';
import reducers from './ngrx/store/reducers/router.reducer';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    EffectsModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    })
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
