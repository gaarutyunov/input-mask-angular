import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {InputMaskAngularModule} from 'input-mask-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InputMaskAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
