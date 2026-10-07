const base=require('@playwright/test');
exports.customTest=base.test.extend(

{


    testDataOrder:
    {

        productName: "ADIDAS ORIGINAL",
email: "smritib462@gmail.com",
password:"Suvam@7123"
    }
}

)