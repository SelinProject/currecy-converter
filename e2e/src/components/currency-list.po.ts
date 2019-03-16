import { $, ElementFinder,  browser, ExpectedConditions, element, by } from 'protractor';
import { AppPage } from '../app.po';

const EC = ExpectedConditions;

export class CurrencyListPo extends AppPage  {

    public waitUntilPage(){
        const page = AppPage.getElementByID('#currency-list');
        browser.wait(EC.presenceOf(page));
    }

    public  getCurrencyList(): ElementFinder {
        return AppPage.getElementByID('#currency-list');
    }

    public  seeErrorMessage(): ElementFinder {
        return AppPage.getElementByID('#currency-list-error-message');
    }

  
}
