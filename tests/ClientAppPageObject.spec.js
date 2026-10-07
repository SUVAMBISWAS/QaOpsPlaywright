const {test,expect}=require('@playwright/test');
const {customTest}=require('../Utils/test-base');
const dataSet = JSON.parse(JSON.stringify(require('../Utils/AllDataSet.json')));

const PoManager=require('../pageobjects/PoManager');

for (const data of dataSet){
test(`@web client app login for ${data.productName}`, async ({ page }) => {

const poManager=new PoManager(page);

    // const productName = "ZARA COAT 3";
    // const email= "suvambiswas.sb@gmail.com";
    // const password= "Suvam@7432";
const loginPage=poManager.getLoginPageObject();//

await loginPage.goTo();
await loginPage.validateLoginPage(data.email,data.password);
    
const dashboardPage=poManager.getDashboardObject();

await dashboardPage.searchProductAddToCart(data.productName);
   
await dashboardPage.clickOnCart();
    await page.locator("div li").first().waitFor();

    await expect(
        page.getByRole('heading', { name: data.productName, exact: true })
    ).toBeVisible();
       await page.locator("text=Checkout").click();


       await page.locator("[placeholder*='Country']").pressSequentially("ind");
       const Options= await page.locator(".ta-results");
await Options.waitFor();
const dropdownCount= await Options.locator("button").count();
       for(let i=0;i<dropdownCount;i++){


      const text=await Options.locator("button").nth(i).textContent();
if(text===" India"){

await Options.locator("button").nth(i).click();
break;

}

       }

       await page.locator("div.title:has-text('CVV Code ') + input").fill("123");
       expect (await page.locator(".user__name [type='text']").first()).toHaveText(data.email);
       await page.locator(".action__submit").click();
       expect ( await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    //  response.orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    //    console.log(response.orderId);

    //    await page.locator("button[routerlink*='myorders']").click();

    //    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
   
    //   const text= await page.locator(".mt-4").textContent();
    //   console.log(text);

       
})
};

customTest(`client app login for one specific data`, async ({ page,testDataOrder }) => {

const poManager=new PoManager(page);

    // const productName = "ZARA COAT 3";
    // const email= "suvambiswas.sb@gmail.com";
    // const password= "Suvam@7432";
const loginPage=poManager.getLoginPageObject();//

await loginPage.goTo();
await loginPage.validateLoginPage(testDataOrder.email,testDataOrder.password);
    
const dashboardPage=poManager.getDashboardObject();

await dashboardPage.searchProductAddToCart(testDataOrder.productName);
   
await dashboardPage.clickOnCart();
    await page.locator("div li").first().waitFor();

    await expect(
        page.getByRole('heading', { name: testDataOrder.productName, exact: true })
    ).toBeVisible();
       await page.locator("text=Checkout").click();


       await page.locator("[placeholder*='Country']").pressSequentially("ind");
       const Options= await page.locator(".ta-results");
await Options.waitFor();
const dropdownCount= await Options.locator("button").count();
       for(let i=0;i<dropdownCount;i++){


      const text=await Options.locator("button").nth(i).textContent();
if(text===" India"){

await Options.locator("button").nth(i).click();
break;

}

       }

       await page.locator("div.title:has-text('CVV Code ') + input").fill("123");
       expect (await page.locator(".user__name [type='text']").first()).toHaveText(testDataOrder.email);
       await page.locator(".action__submit").click();
       expect ( await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    //  response.orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    //    console.log(response.orderId);

    //    await page.locator("button[routerlink*='myorders']").click();

    //    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
   
    //   const text= await page.locator(".mt-4").textContent();
    //   console.log(text);

       
})
