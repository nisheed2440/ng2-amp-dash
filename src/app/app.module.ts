import { AmpDashModule } from '../amp-dash/amp-dash.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    AmpDashModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  declarations: [AppComponent]
})
export class AppModule { }
