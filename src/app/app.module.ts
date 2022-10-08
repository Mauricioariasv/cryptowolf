import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRountingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CryptoListComponent } from './crypto-list/crypto-list.component';

import { HttpClientModule } from '@angular/common/http';
import { CryptoInfoComponent } from './crypto-info/crypto-info.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptoListComponent,
    CryptoInfoComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRountingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
