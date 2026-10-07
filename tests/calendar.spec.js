const {test,expect}=require('@playwright/test');

test ("@web calendar tets case", async ({page})=>{

const monthNumber="5";
const date="18";
const year="2028";
const expectedList=[monthNumber,date,year];

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");


// await page.locator(".react-date-picker__calendar-button").click();
await page.locator("button").nth(2).click();// suggested by playwright in debug mode

await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
await page.getByRole("button",{name:year}).click();

await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
await page.locator("//abbr[text()='"+date+"']").click();


const inputs=page.locator(".react-date-picker__inputGroup__input");

// wait for the 3 input fields (month, day, year) to be present
await expect(inputs).toHaveCount(expectedList.length, {timeout: 5000});

for (let i=0;i<expectedList.length;i++){
	const value=await inputs.nth(i).inputValue();
	expect(value).toEqual(expectedList[i]);

}

});