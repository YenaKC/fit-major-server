# Fit Major Server
Backend API for Fit Major, an e-commerce fitness app built with Express, MongoDB, Mongoose and JWT authentication.

## Description
Fit Major Server provides the backend logic for user authentication, product management, shopping cart features, order creation and order status updates.

The API allows users to sign up, log in, browse products, add items to their cart, create orders from the cart and track order status.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- CORS
- dotenv

## Models

### User
- username
- email
- password
- role

### Product
- name
- description
- category
- price
- stock
- image
- sizes

### Cart
- user
- items
    - product
    - quantity

### Order
- user
- items
    - product
    - quantity
- totalPrice
- status

## API Routes

### Auth Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/signup` | Create a new user |
| POST | `/auth/login` | Log in and receive JWT token |
| GET | `/auth/verify` | Verify logged-in user |

### Product Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | Get all products |
| GET | `/products/:productId` | Get one product |
| POST | `/products` | Create product |
| PUT | `/products/:productId` | Update product |
| DELETE | `/products/:productId` | Delete product |

### Cart Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/cart` | Get logged-in user's cart |
| POST | `/cart/add` | Add product to cart |
| PUT | `/cart/item/:productId` | Update item quantity |
| DELETE | `/cart/item/:productId` | Remove item from cart |

### Order Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/orders` | Create order from cart |
| GET | `/orders` | Get logged-in user's orders |
| GET | `/orders/:orderId` | Get one order |
| PUT | `/orders/:orderId/status` | Update order status |

## Authentication
Protected routes require a JWT token in the Authorization header.

```http
Authorization: Bearer <authToken>