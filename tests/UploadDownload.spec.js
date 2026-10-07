const Exceljs = require('exceljs');
const {test,expect}= require('@playwright/test');


async function writeExcelTest(path,searchText,replaceValue,change) {
    const workbook = new Exceljs.Workbook();

    await workbook.xlsx.readFile(path);

    const worksheet = workbook.getWorksheet('Sheet1');

    
const output=await readExcel(worksheet,searchText);

    const properties = worksheet.getCell(output.row, output.column+change.colChange);

    properties.value =replaceValue;

    await workbook.xlsx.writeFile(path);

}

async function readExcel(worksheet,searchText){
let output={row:-1, column:-1}; 

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {

               output.row=rowNumber;

output.column=colNumber;

            }
        });
    });

    return output;
}


//writeExcel("C:/Users/CODECLOUDS-SUVAM/Downloads/download.xlsx","dragon fruit",980,{rowChange:0, colChange:2});

// Update Mango Price to 350.

// writeExcelTest("Mango", 350, { rowChange: 0, colChange: 2 }, "/Users/rahulshetty/downloads/excelTest.xls");

test('Upload download excel validation', async ({ page }) => {

    const textSearch = 'Mango';
    const updateValue = '350';
        // File location where the downloaded Excel will be saved
    const filePath = 'C:/Users/CODECLOUDS-SUVAM/Downloads/download.xlsx';

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
   const download = await downloadPromise;

    // Save the downloaded file
    await download.saveAs(filePath);

    writeExcelTest(
       
        "C:/Users/CODECLOUDS-SUVAM/Downloads/download.xlsx", textSearch,
        updateValue,
        { rowChange: 0, colChange: 2 }
    );

    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/CODECLOUDS-SUVAM/Downloads/download.xlsx");

    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({ has: textLocator });

    await expect(
        desiredRow.locator("#cell-4-undefined")
    ).toContainText(updateValue);

});