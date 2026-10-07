class DashboardPage{

constructor(page){

this.products=page.locator(".card-body");
this.productText=page.locator(".card-body b");
this.cart=page.locator("[routerlink*='cart']");
}

async searchProductAddToCart(productName){

  
    const titles=await this.productText.allTextContents();
    console.log(titles);
        const count = await this.products.count();
    
        for (let i = 0; i < count; ++i)
        {
            const productText = await this.products
                .nth(i)
                .locator("b")
                .textContent();
    
            console.log(productText);
    
            if (productText === productName)
            {
                await this.products
                    .nth(i)
                    .locator("text=Add To Cart")
                    .click();
    
                break;
            }
        }
}

async clickOnCart(){


     await this.cart.click();
}


}
module.exports=DashboardPage;