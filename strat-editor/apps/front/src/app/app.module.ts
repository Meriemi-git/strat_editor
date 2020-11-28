import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TopBarModule} from '../app/components/top-bar/top-bar.module'
import {DoubleSidenavModule} from '../app/components/double-sidenav/double-sidenav.module'
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
 imports: [BrowserModule,TopBarModule,DoubleSidenavModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
