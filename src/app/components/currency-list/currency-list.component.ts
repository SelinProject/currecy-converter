import { Component, OnInit, Input } from '@angular/core';
import { CurrencyModel } from 'src/app/shared/interfaces/currency-model.interface';
import { Globals } from 'src/app/shared/globals/Globals';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css'],
  providers:[Globals]
})
export class CurrencyListComponent implements OnInit {
  
  @Input() currencyList: CurrencyModel;
  @Input() currecySymbol: string;

  constructor(private globals: Globals) { }

  ngOnInit() {
  }

}
