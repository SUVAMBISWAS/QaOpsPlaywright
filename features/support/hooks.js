const { Before, After, setDefaultTimeout, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const PoManager = require('../../pageobjects/PoManager');

setDefaultTimeout(60 * 1000);

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.poManager = new PoManager(this.page);
});

After(async function () {
  await this.browser.close();
});

BeforeStep(function () {





});

AfterStep(async function ({result}) {


if (result.status===Status.FAILED){

await this.page.screenshot({path : 'screenshot23.png'});
}

    
});