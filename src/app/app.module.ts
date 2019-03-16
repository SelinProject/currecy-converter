import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Globals } from './shared/globals/Globals';

//Register local values
import localeEn from '@angular/common/locales/en';
import localeTr from '@angular/common/locales/tr';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';

//dynamicly get browser local and register 
const localeId = navigator.language.split('-')[0];
import(`@angular/common/locales/${localeId}.js`)
.then(lang => registerLocaleData(lang.default));


@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    CurrencyListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    Globals,
    { provide: LOCALE_ID, useValue: localeId },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
