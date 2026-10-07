const {test, expect}= require ("@playwright/test");

test ("fake order details hacking", async ({page})=>

{

  
    const email= "suvambiswas.sb@gmail.com";
        const pwd= "Suvam@7432";

        await page.route('**/*.css', route => route.abort());

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");



    await page.getByPlaceholder("email@example.com").fill(email);

  
    await page.getByPlaceholder("enter your passsword").fill(pwd);



    await page.getByRole("button",{name: "Login"}).click();

    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();

await page.locator("button[routerlink*='myorders']").click();
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",


route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64ceb62f7244490f9597f2a7'})

);

await page.locator("button:has-text('View')").first().click();

await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

}


)