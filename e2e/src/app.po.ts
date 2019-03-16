import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  public static getElementByID(id: string){
    return element(by.css(id));
  }

  public static getElementByName(name: string){
    return element(by.css(name));
  }

  public static getAllElementByID(id: string){
    return element(by.css(id));
  }
  
}
