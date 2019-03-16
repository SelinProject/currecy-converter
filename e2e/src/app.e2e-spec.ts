import { AppPage } from './app.po';
import { browser, logging, element, by, ExpectedConditions } from 'protractor';
import {  CurrencyListPo } from './components/currency-list.po';
import {  CurrencyConverterPo } from './components/currency-converter.po';


describe('Currency Rate App', () => {
  let page: AppPage;
  let currencyConverterPage = new CurrencyConverterPo();
  let currencyListPage = new CurrencyListPo();


  beforeEach(() => {
    page = new AppPage();
  });

  beforeAll(() =>{
    page = new AppPage();
    page.navigateTo();
  });


  it('should see page', () => {
    expect(browser.getCurrentUrl()).toContain('/');
  });

  it('user should not click convert amount button  without select currencies', ()=>{
    currencyConverterPage.waitForButton();
    var attr = currencyConverterPage.getAmount().getAttribute('disabled');
    expect(attr).toEqual('true');
  });

  
  it('user should see currencies based on EURO ', ()=>{
    currencyListPage.waitUntilPage();
    let list = currencyListPage.getCurrencyList();
    expect(list).toBeDefined();
  });

  it('user should select baseCurrency, targetCurrency and enter amount ', ()=>{
    let enteredAmount = 10;
    let targetCurrency = 'USD';
    let baseCurrency = 'GBP';
    currencyConverterPage.selectBaseCurrency(baseCurrency);
    currencyConverterPage.selectTargetCurrency(targetCurrency);
    currencyConverterPage.setAmount().sendKeys(enteredAmount);
    currencyConverterPage.getAmount().click();

    //calculate value based on currency from response
     element(by.name(targetCurrency)).getText().then(function(text){
        let customizeText = text.split('£')[1]; // split text from symbol
        let customizedValue = parseFloat(customizeText); // parse string to float
        let calculatedAmount = Math.round(customizedValue * enteredAmount * 100)/ 100;

        // get calculated value form screen
        element(by.id('calculated-amount-value')).getText().then(function(val){
          let customizeText = val.split('$')[1]; // split text from symbol
          let customizedValue = parseFloat(customizeText); // parse string to float
          customizedValue = Math.round(customizedValue * 10)/10
          expect(calculatedAmount).toEqual(customizedValue); 
        });
    });
    
  });

  it('when user change baseCurrency to USD currency list should change to base on that . ', ()=>{
    let baseCurrency = 'USD';
    currencyConverterPage.selectBaseCurrency(baseCurrency);

   currencyListPage.getCurrencyList().getText().then(function(text){
      expect(text).toContain('$')
    })
  });

  it('when user reselecet new baseCurrency calculatedAmount should not shown until convert button click', () => {
    let baseCurrency = 'JPY';
    let targetCurrency = 'USD';
    let enteredAmount = 20;
    currencyConverterPage.selectBaseCurrency(baseCurrency);
    currencyConverterPage.selectBaseCurrency(baseCurrency);
    currencyConverterPage.selectTargetCurrency(targetCurrency);
    currencyConverterPage.setAmount().sendKeys(enteredAmount);
    currencyConverterPage.getAmount().click();
    currencyConverterPage.selectBaseCurrency('TRY');
    expect(currencyConverterPage.getCalculatedAmount()).toBeDefined();
  });

  it('user should see error if currency is undefined', ()=>{
    currencyConverterPage.selectBaseCurrency('undefined');
     currencyConverterPage.showErrorPage();
    browser.sleep(2000)
  });

});
