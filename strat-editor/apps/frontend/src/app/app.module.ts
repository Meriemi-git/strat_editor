import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TopBarModule } from '../app/components/atoms/top-bar/top-bar.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LeftPanelModule } from './components/molecules/left-panel/left-panel.module';
import { RightPanelModule } from './components/molecules/right-panel/right-panel.module';
import { AppInitService } from './services/app-init.service';
import { HttpJwtInterceptor } from './interceptors/http-jwt-interceptor';
import { ToastrModule } from 'ngx-toastr';

export function init_app(appInitService: AppInitService) {
  return () => appInitService.initializeApp();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TopBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MatIconModule,
    RightPanelModule,
    LeftPanelModule,
    MatButtonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 40,
    }),
    EffectsModule.forRoot(effects),
    HttpClientXsrfModule.withOptions(),
    ToastrModule.forRoot({
      maxOpened: 2,
      newestOnTop: true,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpJwtInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppInitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
