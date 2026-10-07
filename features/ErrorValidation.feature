Feature: Ecommerce validation
@Validation
Scenario Outline:  placing the order
Given a login to ecommerce2 application using username "<username>" and password "<password>"

Then verify for wrong credentilas error message is displayed

Examples:
| username              | password       |
|suvamb@gmail.com       | akdbfkgf       |
|suvamb@gmail.com       | akdbflgf       |