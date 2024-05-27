# Stratex-Assessment

## Project Overview

This project is an API for a bookstore that allows sellers to upload book details via a CSV file. The API processes the CSV file, extracts the book details, and stores them in a database.

## Project Structure
```
└── 📁controllers
    └── bookController.js
    └── sellerController.js
    └── userController.js
└── 📁middleware
    └── authMiddleware.js
└── 📁prisma
    └── 📁migrations
        └── 📁20240527104240_init
            └── migration.sql
        └── migration_lock.toml
    └── schema.prisma
└── 📁routes
    └── bookRoutes.js
    └── sellerRoutes.js
    └── userRoutes.js
└── 📁uploads
    └── sample.csv
└── .env
└── .gitignore
└── package-lock.json
└── package.json
└── readme.md
└── server.js
```


## Key Components

### Controllers

- **bookController.js**: Manages CRUD operations for books.
- **sellerController.js**: Handles the CSV upload functionality and processes the file to store book details.

### Middleware

- **authMiddleware.js**: Contains JWT authentication middleware to protect routes and ensure that only authenticated users can upload books.

### Routes

- **bookRoutes.js**: Defines routes for book-related operations.
- **sellerRoutes.js**: Defines routes for seller-related operations, including the CSV upload endpoint.

### Prisma

- **schema.prisma**: Defines the database schema using Prisma ORM.

### Environment Variables

- **.env**: Stores environment variables such as database connection strings and JWT secret keys.

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/bookstore-api.git
   cd bookstore-api
2. **Install dependencies:**
   ```sh
    npm install
3. **Configure environment variables:**
   Create a .env file in the root directory and add the necessary environment variables.
   ```makefile
    DATABASE_URL="your-database-url"
    JWT_SECRET="your-jwt-secret"
4. **Run Database Migrations:**
   ```sh
   npx prisma migrate dev --name init
5. **Start the Server:**
   ```sh
   npm run dev

## Conclusion
This project provides a simple yet robust API for managing book uploads via CSV files for a bookstore application. It includes authentication, file processing, and database operations using modern Node.js and Prisma ORM practices.  

## API Documentation
https://documenter.getpostman.com/view/23129267/2sA3Qs9XQC

## Project Vedio Explanation:
https://www.loom.com/share/8e1e347f326542ae8160abe7017e1084?sid=184d4db9-efcf-400b-8cda-7a559afe5480
