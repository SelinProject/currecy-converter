import { Component, OnInit } from '@angular/core';
import { CurrencyApiService } from '../../core/currency-api.service';
import { CurrencyModel, Rates } from '../../shared/interfaces/currency-model.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, MinLengthValidator } from '@angular/forms';
import { Globals } from 'src/app/shared/globals/Globals';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
  providers:[ Globals ]
})
export class CurrencyConverterComponent implements OnInit {

  public currencies: CurrencyModel;
  public error: boolean;
  public baseSelectedCurrency: any = 'EUR';
  public targetSelectedCurrency: Rates;
  public amount: number;
  public calculatedAmount: number;
  public isClicked: boolean;
  public currencyFrom: FormGroup;

  private destroyed$: Subject<void> = new Subject<void>();

  constructor( private formBuilder: FormBuilder,
               public currencyService: CurrencyApiService,
               private globals: Globals) {}

  public ngOnInit(): void {
    this.currencyFrom = this.initCurrencyFrom();
    this.getCurrencies(this.baseSelectedCurrency);
  }

  private initCurrencyFrom(): FormGroup{
    return this.formBuilder.group({
      amount:[null, [Validators.required, Validators.minLength(1)]]
    });
  }

  private getCurrencies(baseCurrency: string): void{
    this.isClicked = false;
    this.currencyService.getCurrencies(baseCurrency).pipe(
      takeUntil(this.destroyed$)
    ).subscribe((currencies: CurrencyModel) => {
      this.currencies = currencies;
      this.currencies.rates = this.convertArray(currencies);
      this.error = false;
    }, error => {
      console.error(error);
      this.error = true;
    });
  }

  private convertArray(currencies): any {
    let rates: Rates[] = [];
     Object.keys(currencies.rates).map(function(key) {
      rates.push({'name':key, 'value':currencies.rates[key]});
    });
    return rates;
  }

  public convertAmount(): void{
    this.isClicked = true;
      if(this.currencyFrom.controls['amount'].value === null ||
       this.baseSelectedCurrency === undefined ||
       this.targetSelectedCurrency === undefined){
         this.error = true;
       }
     this.calculatedAmount = this.currencyFrom.controls['amount'].value * this.targetSelectedCurrency.value;
  }


  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  
}
