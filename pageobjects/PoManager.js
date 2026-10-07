const DashboardPage=require('./DashboardPage');
const LoginPage=require('./LoginPage');
class PoManager
{


constructor(page){

this.page=page;

     this.loginPage=new LoginPage(this.page);
     this.dashboardPage=new DashboardPage(this.page);
}

getLoginPageObject()
{

return this.loginPage;
}


getDashboardObject()
{

return  this.dashboardPage;
}

}
module.exports=PoManager;