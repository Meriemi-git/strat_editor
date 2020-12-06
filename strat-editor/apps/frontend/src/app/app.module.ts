import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TopBarModule } from '../app/components/atoms/top-bar/top-bar.module'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers'
import { effects } from './store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent],
 imports: [
  BrowserModule,
  TopBarModule,
  BrowserAnimationsModule,
  HttpClientModule,
  AppRoutingModule,
  StoreModule.forRoot(reducers),
  StoreDevtoolsModule.instrument({
    maxAge: 40, // Retains last 25 states
  }),
  EffectsModule.forRoot(effects),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
