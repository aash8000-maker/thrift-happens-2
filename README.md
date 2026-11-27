# Thrift Happens — Project 2

## COMP2013 — Web Programming 2

## Project Description

Thrift Happens is a full-stack online thrift clothing store developed using React, TypeScript, Express, and MongoDB. The application extends Project 1 by replacing local product data with a MongoDB database and implementing CRUD operations.

## Technologies Used

- React
- TypeScript
- Vite
- Axios
- Node.js
- Express
- MongoDB Atlas
- Mongoose

## Features

- Display clothing products from MongoDB.
- Add new clothing products.
- Edit existing clothing products.
- Delete clothing products.
- Validate product information.
- Display success and error messages.
- Add products to checkout.
- Manage available stock quantities.
- Calculate subtotals and grand totals.
- Remove products and empty the checkout.

## Database Setup

1. Create a MongoDB Atlas database.
2. Create a database named `thriftHappens`.
3. Create a collection named `clothes`.
4. Import `backend/data.json` into the collection using MongoDB Compass.
5. Copy `backend/.env.example` to `backend/.env`.
6. Replace the placeholder with your MongoDB connection string.

Environment variables:

```
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
PORT=3000
```

## Backend Setup

Open a terminal from the project root:

```bash
cd backend
npm install
npm run dev
```

The backend runs at http://localhost:3000.

## Frontend Setup

Open a separate terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## API Endpoints

| Method | Endpoint  | Description                    |
| ------ | --------- | ------------------------------ |
| GET    | /data     | Retrieve all clothing products |
| POST   | /data     | Create a clothing product      |
| PATCH  | /data/:id | Update a clothing product      |
| DELETE | /data/:id | Delete a clothing product      |

## Checkout

The checkout is managed using React state. Available stock is calculated by subtracting the checkout quantity from the database stock. Removing products or emptying the checkout restores available stock.

Checkout information is not stored in MongoDB. Editing or deleting a product removes its associated checkout entry to prevent outdated product information.

## Project Structure

- `frontend/` — React frontend and components.
- `backend/` — Express server and database model.
- `backend/data.json` — Original clothing product data.
- `backend/.env.example` — Environment variable template.

## Security

Database credentials are stored in a local `.env` file and excluded from GitHub using `.gitignore`.
