Feature: Ecommerce validation
@Regression
Scenario:  placing the order
Given a login to ecommerce application using username "suvambiswas.sb@gmail.com" and password "Suvam@7432"
When add "ZARA COAT 3" to the cart
Then verify order is added to the cart
When place the order with valid details
Then verify placed order is displayed in order history


@Validation
Scenario Outline:  placing the order
Given a login to ecommerce2 application using username "<username>" and password "<password>"

Then verify for wrong credentilas error message is displayed

Examples:
| username              | password       |
|suvamb@gmail.com       | akdbfkgf       |
|suvamb@gmail.com       | akdbflgf       |
