# 🍕 Pizza4Pickup 🍕

Is an application for both hungry customers looking for Pizza's and the restaurant to manage the orders and communication.


## Final Product

![Pizza Homepage](https://github.com/wang790222/pizzaForPickup/blob/master/public/pizza_homepage.gif)
![Pizza Creator](https://github.com/wang790222/pizzaForPickup/blob/master/public/pizza_visual_creator.gif)
![Orders Page](https://github.com/wang790222/pizzaForPickup/blob/master/public/Screen%20Shot%202019-02-05%20at%2010.39.39%20AM.png)

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

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

1️⃣ Install all dependencies (using `npm install` command).

2️⃣ Run the development web server using the `node express_server.js` command simply type `npm run local` volià!

3️⃣ Go to localhost `localhost:8080`

Here you are able to:

✅ Customers: Order see the price, time estimate and the pizza generator (/index)

✅ Restaurant: See orders, text message new ones come in with ability to update or confirm estimate (/restaurant)

✅ Customers: Receive text updates on the estimated time and mark pick up times

Enjoy