const { test, expect } = require('@playwright/test');






test("sp test case", async ({ page }) => {

    const productName = "ZARA COAT 3";
    const email= "suvambiswas.sb@gmail.com";
        const pwd= "Suvam@7432";

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    // await page.locator("#userEmail")
    //     .fill(email);

    await page.getByPlaceholder("email@example.com").fill(email);

    // await page.locator("#userPassword")
    //     .fill(pwd);
    await page.getByPlaceholder("enter your passsword").fill(pwd);

    // await page.locator("#login").click();

    await page.getByRole("button",{name: "Login"}).click();

    await page.waitForLoadState("networkidle");

    // const products = page.locator(".card-body");   

    // const count = await products.count();

    // for (let i = 0; i < count; ++i)
    // {
    //     const productText = await products
    //         .nth(i)
    //         .locator("b")
    //         .textContent();

    //     console.log(productText);

    //     if (productText === productName)
    //     {
    //         await products
    //             .nth(i)
    //             .locator("text=Add To Cart")
    //             .click();

    //         break;
    //     }
    // }

    await page.locator(".card-body").filter({hasText:productName}).getByRole("button",{name:" Add To Cart"}).click();

    // await page.locator("[routerlink*='cart']").click();

    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();

    await page.locator("div li").first().waitFor();

    // const bool = await page
    //     .locator("h3:has-text('ZARA COAT 3')")
    //     .isVisible();

    // expect(bool).toBeTruthy();

      await expect(page.getByText(productName)).toBeVisible();
    //    await page.locator("text=Checkout").click();

await page.getByRole("button",{name:"Checkout"}).click();
  


    //    await page.locator("[placeholder*='Country']").pressSequentially("ind");

    await page.getByPlaceholder("Select Country").pressSequentially("ind");
       const Options= await page.locator(".ta-results");
await Options.waitFor();
// const dropdownCount= await Options.locator("button").count();
//        for(let i=0;i<dropdownCount;i++){


//       const text=await Options.locator("button").nth(i).textContent();
// if(text===" India"){

// await Options.locator("button").nth(i).click();
// break;

// }

//        }
await page.getByRole("button", {name:"India"}).nth(1).click();

       await page.locator("div.title:has-text('CVV Code ') + input").fill("123");
       expect (await page.locator(".user__name [type='text']").first()).toHaveText(email);
    //    await page.locator(".action__submit").click();

    await page.getByText("PLACE ORDER").click();
       expect ( await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
       const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
       console.log(orderId);

       await page.locator("button[routerlink*='myorders']").click();
       await page.locator("tbody").waitFor();

       const rows= await page.locator("tbody tr");
       for(let i=0;i<await rows.count();i++){

const expectId= await rows.nth(i).locator("th").textContent();

if (orderId.includes(expectId)){
await rows.nth(i).locator("button").first().click();
break;

}

       }

await expect(page.locator(".tagline"))
    .toHaveText("Thank you for Shopping With Us");

       await page.pause();
});