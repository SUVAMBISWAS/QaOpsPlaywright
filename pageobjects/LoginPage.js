class LoginPage {
    constructor(page) 
    {
 this.username= page.locator("#userEmail");
 this.password= page.locator("#userPassword");
 this.signinBtn=page.locator("#login");
 this.page=page;

    }


    async goTo()
    {


 await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

   async validateLoginPage(email,password)
   {

 await this.username.fill(email);
 await this.password.fill(password);
 await this.signinBtn.click();
 await this.page.waitForLoadState("networkidle");

    }
}

module.exports = LoginPage;