const { test, expect ,request } = require('@playwright/test');
const {ApiUtils}= require('../Utils/ApiUtils');

const logInData={userEmail: "suvambiswas.sb@gmail.com", userPassword: "Suvam@7432"};
const orderPaylod={orders:[{country:"Tunisia",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};
let response;


test.beforeAll(async () => {
  const apiContext = await request.newContext();
const apiUtils=new ApiUtils(apiContext,logInData);
response=await apiUtils.createOrder(orderPaylod);
//   const loginResponse = await apiContext.post(
//     "https://rahulshettyacademy.com/api/ecom/auth/login",
//     {
//       data: logInData,
//     }
//   );

//   expect(loginResponse.ok()).toBeTruthy();

//   const loginResponseJson = await loginResponse.json();
//   logInToken = loginResponseJson.token;

//   console.log(logInToken);

//   const orderResponse = await apiContext.post(
//     "https://rahulshettyacademy.com/api/ecom/order/create-order",
//     {
//       data: orderPaylod,
//        headers: {
//       Authorization: logInToken,
//       "Content-Type": "application/json",
//     }
//     }



//   );

// const orderJson= await orderResponse.json();
// console.log(orderJson);

// orderId= orderJson.orders[0];
// console.log(orderId);

  
});

test("sp test case", async ({ page }) => {



    //const productName = "ZARA COAT 3";
    //const email= "suvambiswas.sb@gmail.com";


        page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");



    // await page.locator("#userEmail")
    //     .fill(email);

    // await page.locator("#userPassword")
    //     .fill("Suvam@7432");

    // await page.locator("#login").click();

    await page.waitForLoadState("networkidle");

//     const products = page.locator(".card-body");   

//     const count = await products.count();

//     for (let i = 0; i < count; ++i)
//     {
//         const productText = await products
//             .nth(i)
//             .locator("b")
//             .textContent();

//         console.log(productText);

//         if (productText === productName)
//         {
//             await products
//                 .nth(i)
//                 .locator("text=Add To Cart")
//                 .click();

//             break;
//         }
//     }

//     await page.locator("[routerlink*='cart']").click();

//     await page.locator("div li").first().waitFor();

//     const bool = await page
//         .locator("h3:has-text('ZARA COAT 3')")
//         .isVisible();

//     expect(bool).toBeTruthy();
//        await page.locator("text=Checkout").click();


//        await page.locator("[placeholder*='Country']").pressSequentially("ind");
//        const Options= await page.locator(".ta-results");
// await Options.waitFor();
// const dropdownCount= await Options.locator("button").count();
//        for(let i=0;i<dropdownCount;i++){


//       const text=await Options.locator("button").nth(i).textContent();
// if(text===" India"){

// await Options.locator("button").nth(i).click();
// break;

// }

//        }

//        await page.locator("div.title:has-text('CVV Code ') + input").fill("123");
//        expect (await page.locator(".user__name [type='text']").first()).toHaveText(email);
//        await page.locator(".action__submit").click();
    //    expect ( await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    //  response.orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
       console.log(response.orderId);

       await page.locator("button[routerlink*='myorders']").click();
       await page.locator("tbody").waitFor();

       const rows= await page.locator("tbody tr");
       for(let i=0;i<await rows.count();i++){

const expectId= await rows.nth(i).locator("th").textContent();

if (response.orderId.includes(expectId)){
await rows.nth(i).locator("button").first().click();
break;

}

       }



await expect(page.locator(".tagline"))
    .toHaveText("Thank you for Shopping With Us");

       
});

//verify if order created is showing i history page