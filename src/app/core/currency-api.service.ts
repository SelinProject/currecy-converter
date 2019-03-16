import { Injectable } from '@angular/core';
import { CurrencyModel } from '../shared/interfaces/currency-model.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CurrencyApiService {

  constructor( private httpClient: HttpClient) { }

  public getCurrencies(base: string): Observable<CurrencyModel> {
    return this.httpClient.get<CurrencyModel>(`https://api.exchangeratesapi.io/latest`, {params: { base }});
  }

}
