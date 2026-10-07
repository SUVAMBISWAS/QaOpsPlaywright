class ApiUtils
{


    constructor(apiContext,logInData){
        this.apiContext=apiContext;
        this.logInData=logInData;
        
    } 

    async getToken()
    
    {

  const loginResponse = await this.apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: this.logInData,
    }
  );


  const loginResponseJson = await loginResponse.json();
  const logInToken = loginResponseJson.token;
  return logInToken;

    }

   async createOrder(orderPaylod)
    
    {
      let response={};
response.token= await this.getToken();

  const orderResponse = await this.apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPaylod,
       headers: {
      Authorization: response.token,
      "Content-Type": "application/json",
    }
    }



  );

  const orderJson= await orderResponse.json();
console.log(orderJson);

const orderId= orderJson.orders[0];
response.orderId=orderId;
return response;

    }

  
}
  module.exports={ApiUtils};