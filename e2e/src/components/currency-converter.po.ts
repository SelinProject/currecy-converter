import { $, ElementFinder, element, by, browser, ExpectedConditions } from 'protractor';
import { AppPage } from '../app.po';

const EC = ExpectedConditions;

export class CurrencyConverterPo extends AppPage {
 
    public waitForButton(){
        const button = element(by.css('#amount'));
        browser.wait(EC.presenceOf(button));
    }

    public  getBaseCurrency(): ElementFinder {
        return  AppPage.getElementByID('#base-currency');
    }

    public selectBaseCurrency(currency) {
        element(by.cssContainingText('#base-currency option', currency)).click();
    }

    public selectTargetCurrency(currency) {
        element(by.cssContainingText('#target-currency option', currency)).click();
    }

    public  getTargetCurrency(): ElementFinder {
        return AppPage.getElementByID('#target-currency');
    }

    public  getAmount(): ElementFinder {
        return AppPage.getElementByID('#amount');
    }

    public getCalculatedAmount(): ElementFinder{
        return AppPage.getElementByID('#calculated-amount-value');
    }

    public setAmount(){
        return AppPage.getElementByID('#enter-amount');
    }

    public showErrorPage(){
        return AppPage.getElementByID('#errorMessage');
    }
}
