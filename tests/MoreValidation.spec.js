const {test,expect}=require('@playwright/test');
test("pop up validation", async({page}) =>{



await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
// await page.goto("https://www.google.com/");
// await page.goBack();
// await page.goForward();

await expect (page.locator("#displayed-text")).toBeVisible();
await page.locator("#displayed-text").screenshot({path:'view.png'});
await page.locator("#hide-textbox").click();
await page.screenshot({path: 'hide.png'});
await  expect (page.locator("#displayed-text")).toBeHidden();
page.on('dialog', dialog => dialog.accept());
await page.locator("#confirmbtn").click();

await page.locator("#mousehover").hover();
//
const iframes=await page.frameLocator("#courses-iframe");
await iframes.locator("li a[href='lifetime-access']:visible").click();

const text=await iframes.locator(".text h2").textContent();

console.log(text.split(" ")[1]);
})



test("visual testing", async({page})=>


{
test.skip(!!process.env.CI, "visual baseline is Windows-only");

await page.goto("https://google.com");

expect(await page.screenshot()).toMatchSnapshot('visual.png');


})