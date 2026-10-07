const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('a login to ecommerce application using username {string} and password {string}', async function (username, password) {
  const loginPage = this.poManager.getLoginPageObject();

  await loginPage.goTo();
  await loginPage.validateLoginPage(username, password);
});

When('add {string} to the cart', async function (productName) {
  this.productName = productName;
  const dashboardPage = this.poManager.getDashboardObject();

  await dashboardPage.searchProductAddToCart(productName);
  await dashboardPage.clickOnCart();
});

Then('verify order is added to the cart', async function () {
  await this.page.locator("div li").first().waitFor();

  await expect(
    this.page.getByRole('heading', { name: this.productName, exact: true })
  ).toBeVisible();
  await this.page.locator("text=Checkout").click();
});

When('place the order with valid details', async function () {
  await this.page.locator("[placeholder*='Country']").pressSequentially("ind");
  const options = this.page.locator(".ta-results");
  await options.waitFor();

  const dropdownCount = await options.locator("button").count();
  for (let i = 0; i < dropdownCount; i++) {
    const text = await options.locator("button").nth(i).textContent();
    if (text === " India") {
      await options.locator("button").nth(i).click();
      break;
    }
  }

  await this.page.locator("div.title:has-text('CVV Code ') + input").fill("123");
  await this.page.locator(".action__submit").click();
});

Then('verify placed order is displayed in order history', async function () {
  await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  await this.page.locator("button[routerlink*='myorders']").click();
  await this.page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

  await expect(this.page.locator("table tbody tr").first()).toContainText(this.productName);
});

Given('a login to ecommerce2 application using username {string} and password {string}', async function (username, password) {

  const userName = this.page.locator("#username");
  const signIn = this.page.locator("#signInBtn");
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await this.page.title());


  await userName.fill(username);
  await this.page.locator("#password").fill(password);
  await signIn.click();


});

Then('verify for wrong credentilas error message is displayed', async function () {
  console.log(await this.page.locator("[style*='block']").textContent());

  await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});
