# 🍕 Pizza4Pickup 🍕

A full-stack application that caters to hungry customers looking to order pizza, and a single restaurant who provides the pizzas. Users from both sides can use this app to manage the status of the orders and communicate throughout the pick up process.


## Final Product

![Pizza Homepage](https://github.com/wang790222/pizzaForPickup/blob/master/public/pizza_homepage.gif)
![Ordered Pizzas](https://github.com/wang790222/pizzaForPickup/blob/master/public/Screenshots_Pizza4Pickup/Pizza%20Form.png?raw=true)
![Pizza Creator](https://github.com/wang790222/pizzaForPickup/blob/master/public/pizza_visual_creator.gif)
![Order Summary](https://github.com/wang790222/pizzaForPickup/blob/master/public/Screenshots_Pizza4Pickup/Order%20Summary.png?raw=true)
![Restaurants Page](https://github.com/wang790222/pizzaForPickup/blob/master/public/Screenshots_Pizza4Pickup/Restaurant%20Page.png?raw=true)


## Dependencies

- Express
- bodyParser
- Node 5.10.x or above
- sass
- moment
- moment-timezone
- knex
- morgan
(twilio if you wanted to run the text message component)

## Getting Started

1️⃣ Fork this repository, then clone your fork of this repository.

2️⃣ Install all dependencies (using `npm install` command).

3️⃣ Run the development web server using the `node express_server.js` command simply type `npm run local` volià!

4️⃣Go to localhost `localhost:8080` in your browser.


### Pages and Functionality

##### Customers (index, confirmation page)

✅ Build custom pizzas

✅ See a live estimate of the total price and preparation time

✅ See a preview of the custom pizza they're building

✅ Can add or delete pizzas and extras before checking out

✅ After checking out, will see a summary of ordered items, along with total price before confirming their order

✅ Will be prompted to enter their phone number, name and postal code for picking up

✅ Recieve a text message when their order is confirmed by the restaurant

✅ Will recieve a second text message when it is time to pick up their order


##### Restaurant (/restaurant)

✅ Recieve text messages for every incoming order

✅ See incoming orders with full details, sorted by order status and listed by the most recent

✅ Can update or confirm estimated pick up time



##### Enjoy!




















