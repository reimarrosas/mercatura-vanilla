# Mercatura E-Commerce App

## Description

Mercatura is an E-Commerce App that sells everyday products. It has almost everything you expect for an E-Commerce App, Login for personalization, Cart for storing items, Category search for searching products within the same category, Fuzzy product search for searching products that is similar enough to the query, and a Checkout page that ‘ships’ the product to the specified address.

## Features

As mentioned above, these are the following features

- **Login** - for personalization, did not have the time to properly implement but you can signup and login with an account.
- **Cart** - for storing items the user wants to purchase. Did not manage to implement counting and deleting one-by-one but there’s a clear cart and aggregate total.
- **Category Search** - allows the user to search all the products within the category. Fully implemented.
- **Fuzzy Product Search** - allows the user to search all the products that have a certain degree of similarity to the query. Fully implemented.
- **Paginated Product Results** - renders the results of the query incrementally so the user can save data and time waiting for the results to generate. Not fully implemented since the user cannot specify the amount of products generated per page, and cannot jump to a specific page, can only be navigated one by one.
- **Checkout** - allows the user to ‘checkout’ the products of their cart and request mercatura to send them to the given address. Not fully implemented, does not have address validation for postal codes, etc, and it’s fully client-side. Mercatura only seems to check out the items and doesn’t actually have any logic for processing the request.

## Design Process

Mercatura’s design is inspired by popular websites like Amazon and Ebay but the theming is fully designed by yours truly. It is made to look as professional as possible with the limitation of using only Vanilla JavaScript, HTML5, and CSS3 in the frontend especially with the limited time.

## Techniques Used

- **Pagination** - a technique that incrementally requests the API for the result of a specific database query to offload the time and space requirements for requesting thousands of data at once.
- **Conditional Rendering** - a javascript-only technique that, based on the current state of the application, renders an html element and its children conditionally. It is mainly used for conditionally rendering if the button in the navigation bar should be logout or login, if the Category card should be shown when the query page is accessed through the category page or not shown if the query page is accessed through the search bar, and finally the Checkout Success message when the address form is filled out and submitted in the checkout page.

## Tools Used

### Frontend

- [HTML5](https://html.spec.whatwg.org/multipage/) for the markup
- [CSS3](https://www.w3.org/TR/CSS/#css) for the styling
- Flexbox for CSS layouts
- Modern [JavaScript](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) for the view logic
- [SanitizeCSS](https://csstools.github.io/sanitize.css/), an external CSS library for resetting the CSS

### Backend
- [NodeJS](https://nodejs.org/en/) Runtime for running JavaScript as API code
- [Express](https://expressjs.com/) Framework, a NodeJS framework for creating APIs
- [PostgreSQL](https://www.postgresql.org/) as the database
- [TypeScript](https://www.typescriptlang.org/) for introducing type-safety to JavaScript

## Asset Sources

- [data.world](https://data.world/) - product datasets used in the database
- [unsplash](https://unsplash.com/) - high-quality image assets
- [Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page) - non-copyright assets
- [Google Fonts](https://fonts.google.com/) - free-to-use fonts
- [Google Icons](https://fonts.google.com/icons) - free-to-use icons

## Future Improvements

- Since it was coded in a rush, the code is not modularly written and there are a lot of arbitrarily-combined code. It could be refactored into a more modular, reusable, code.
- Usage of Web [Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) for removing the repetition of the Header, Footer, and Cart in multiple pages and just use JavaScript to create a custom element that can be reused in multiple pages.
- Fully implement personalization for the website and actually use the user accounts to suggest, customize the dashboard, and save user data like addresses and credentials to make the website feel more individualized.
- Implement a product page where you can see the details of the products.
- Implement a commenting system where users can rate and comment on the products.
- Properly handle Checkout logic in the Frontend and the Backend.
- Add payments using an external API called [Stripe](https://stripe.com) to be able to properly implement checkout.
- Cleanup the styles using a preprocessor like [SASS](https://sass-lang.com), a CSS Framework like [Bootstrap 5](https://getbootstrap.com/) or [Tailwind CSS](https://tailwindcss.com/), or properly implement the CSS styles manually.
- Rehash the design since it was done in a rush. A more professional looking website can be done if taken the time to design properly.