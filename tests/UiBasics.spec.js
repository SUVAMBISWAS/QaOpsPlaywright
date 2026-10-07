const {test,expect}=require('@playwright/test');
test('normal test case', async ({browser}) => 
    {
  
  
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        console.log(await page.title());
        const userName = page.locator("#username");
          const body = page.locator(".card-body a");
          const terms=page.locator("#terms");
         const document1= page.locator("[href*='documents-request']");
         const document2= page.locator("[href*='techs']");
        //await userName.fill("rahulshettyacademy");
           await page.locator("input[name='password']").fill("Learning@830$3mK2"); //write pwd
            //await page.locator("input[name='password']").fill("Learning@80$3mK2");// wrong pwd
          await page.locator(".checkmark").nth(1).click();// click on radio button
           await page.locator("#okayBtn").click();
            const dropdown= page.locator("select.form-control");
await dropdown.selectOption("teach");//
await terms.check(); // 


await expect(terms).toBeChecked();

await terms.uncheck();

await expect(terms).not.toBeChecked();

await expect(document1).toHaveAttribute("class","blinkingText");
await expect(document2).toHaveAttribute("class","blinkingText");

const [newPage1]= await Promise.all([
  context.waitForEvent('page'),
  document1.click()
]);
const text= await newPage1.locator(".red").textContent();

const domain=await text.split("@");

const finaldomain=domain[1].split(" ")[0].trim();

await page.locator("#username").fill(finaldomain);
            await page.pause();

            await page.locator("input[name='signin']").click();//

        // console.log(await page.locator("[style*='block']").textContent());
        // await expect(page.locator("[style*='block']")).toContainText('Incorrect');
        // console.log(await body.first().textContent());
        //    console.log(await body.nth(1).textContent());

        //    console.log(await body.allTextContents());

});

// test('1st playwright test case', async ({page}) => 
//     {
  
  
//         await page.goto('https://www.google.com/');

//         console.log (await expect(page.title()));
//         await expect(page).toHaveTitle('Google');

// });