export interface CurrencyModel {
    rates: Rates[],
    base: string,
    date: string
}

export interface Rates {
    name: string,
    value: number
}
  
