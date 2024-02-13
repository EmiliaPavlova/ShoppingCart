# Shopping Cart Task

This project uses React + TypeScript + Vite.

## Available Scripts

- `npm run dev` - runs the app in the development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
- `npm test` - no tests for the moment
- `npm run build` - builds the app for production to the `build` folder. It bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

## Requirements

#### OBJECTIVE
Design a unit tested frontend application to:
- Display a list of selectable products on a page
- Keep a running total sum of products in the cart using the price information sent from the ShoppingCart API
- Add on shipping costs based on the following rules:

| Cart Value     | Shipping Cost |
| -------------- | ------------- |
| Less than 20   | 7             |
| Less than 40   | 5             |
| Greater than 40| FREE          |

- Verify and apply only one of the following discount rules:

| COUPON CODE   | DISCOUNT                        |
| ------------- | ------------------------------- |
| freeShipping! | Free shipping regardless of total costs|
| APPL10        | 10% off all Apple products      |
| AUDIO15       | FREE                            |
| ELEC25        | 25% off all Electronic products |

- Supported Categories are:
  - Electronic
  - Accessory
  - Audio

- The Coupons are structured as following:

```js
[
  {
    "Code": "freeShipping!",
    "Description": "Free Shipping",
    "Type": 1
  },
  {
    "Code": "APPL10",
    "Description": "10% on all Apple Products",
    "Type": 2,
    "Discount": 0.1,
    "SupplierId": 1
  },
  {
    "Code": "AUDIO15",
    "Description": "15% on all Audio Products",
    "Type": 3,
    "Discount": 0.15,
    "Category": "audio"
  },
  {
    "Code": "ELEC25",
    "Description": "25% on all Electronic Products",
    "Type": 3,
    "Discount": 0.25,
    "Category": "electronic"
  }
]
```

#### EXPECTED FUNCTIONALITY
- Maintain a live running total of the shopping cart including any discounts already applied.
- Must have the ability to edit the shopping cart to remove or add more of existing items already in the cart.
- Ability to filter product list based on category.
- Sort products based on different criteria, for example:
    - Alphabetically
    - Prices
