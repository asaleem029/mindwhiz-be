# MindWhiz E-Commerce Backend API

A full-featured e-commerce backend API built with **Express.js**, **TypeScript**, **PostgreSQL**, and **OvernightJS**.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (RBAC) - Admin and Customer roles
  - Secure password hashing with bcrypt

- **Product Management**
  - Get all products
  - Get product by ID
  - Create new product (Admin only)
  - Product availability tracking

- **Database**
  - PostgreSQL with TypeORM
  - Automatic table synchronization
  - Seeding script with sample data

- **Architecture**
  - Clean, modular code structure
  - OvernightJS decorators for routing
  - Middleware for authentication and authorization
  - Comprehensive error handling

## 📋 Prerequisites

- Node.js >= 18.0.0
- PostgreSQL >= 12
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mindwhiz-be
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your database credentials:
   ```env
   NODE_ENV=development
   PORT=5000
   
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   DB_NAME=mindwhiz_ecommerce
   
   JWT_SECRET=your-secret-key-change-in-production
   ```

4. **Create PostgreSQL database**
   ```bash
   # Login to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE mindwhiz_ecommerce;
   
   # Exit
   \q
   ```

5. **Run database migrations & seed data**
   ```bash
   npm run seed
   ```
   
   This will create tables and populate them with:
   - 2 users (Admin and Customer)
   - 8 sample products

## 🚦 Running the Application

### Development Mode
```bash
npm run dev
```
Server will start on `http://localhost:5000`

### Production Mode
```bash
npm run build
npm start
```

## 📚 API Endpoints

### Health Check
- **GET** `/health` - Check if server is running

### Authentication

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "admin@mindwhiz.com",
    "password": "admin123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "token": "jwt_token_here",
      "user": {
        "id": "uuid",
        "email": "admin@mindwhiz.com",
        "name": "Admin User",
        "role": "admin"
      }
    }
  }
  ```

#### Register
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "email": "newuser@example.com",
    "password": "password123",
    "name": "John Doe",
    "role": "customer"
  }
  ```

### Products

#### Get All Products
- **GET** `/api/products`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Products retrieved successfully",
    "data": [
      {
        "id": "uuid",
        "name": "Wireless Bluetooth Headphones",
        "description": "Premium noise-cancelling wireless headphones...",
        "price": "129.99",
        "availability": "in_stock",
        "imageUrl": "https://...",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

#### Get Product by ID
- **GET** `/api/products/:id`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Product retrieved successfully",
    "data": {
      "id": "uuid",
      "name": "Wireless Bluetooth Headphones",
      "description": "Premium noise-cancelling wireless headphones...",
      "price": "129.99",
      "availability": "in_stock",
      "imageUrl": "https://...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

#### Create Product (Admin Only)
- **POST** `/api/products`
- **Headers:**
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Body:**
  ```json
  {
    "name": "New Product",
    "description": "Product description here",
    "price": 99.99,
    "availability": "in_stock",
    "imageUrl": "https://example.com/image.jpg"
  }
  ```
- **Note:** Only users with `admin` role can create products

## 👥 Default Users

After running the seed script, you'll have these users:

| Email | Password | Role |
|-------|----------|------|
| admin@mindwhiz.com | admin123 | admin |
| customer@mindwhiz.com | customer123 | customer |

## 🏗️ Project Structure

```
mindwhiz-be/
├── src/
│   ├── config/
│   │   └── database.ts          # Database configuration
│   ├── controllers/
│   │   ├── authController.ts    # Authentication endpoints
│   │   ├── productController.ts # Product CRUD endpoints
│   │   └── baseController.ts    # Base controller
│   ├── middleware/
│   │   └── auth.ts              # Auth & RBAC middleware
│   ├── models/
│   │   ├── userModel.ts         # User entity
│   │   └── productModel.ts      # Product entity
│   ├── database/
│   │   └── seed.ts              # Database seeding script
│   ├── utils/
│   │   ├── interfaces.ts        # TypeScript interfaces
│   │   ├── responses.ts         # API response helpers
│   │   └── index.ts             # Utility exports
│   └── server.ts                # Main server file
├── .env                         # Environment variables
├── .env.example                 # Example environment variables
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Documentation
```

## 🔒 Authentication Flow

1. User logs in with email and password
2. Server validates credentials
3. Server generates JWT token with user info (userId, email, role)
4. Client stores token and includes it in subsequent requests
5. Protected endpoints verify token and check user role

## 🛡️ Role-Based Access Control (RBAC)

- **Customer Role**: Can view products and product details
- **Admin Role**: Can view products + create new products

## 🧪 Testing the API

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mindwhiz.com","password":"admin123"}'
```

**Get Products:**
```bash
curl http://localhost:5000/api/products
```

**Create Product (Admin only):**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "availability": "in_stock"
  }'
```

### Using Postman

1. Import the API endpoints
2. Login to get JWT token
3. Add token to Authorization header for protected routes
4. Test all endpoints

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment (development/production) | development |
| PORT | Server port | 5000 |
| DB_HOST | PostgreSQL host | localhost |
| DB_PORT | PostgreSQL port | 5432 |
| DB_USER | Database username | postgres |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | mindwhiz_ecommerce |
| JWT_SECRET | Secret key for JWT | (change in production) |

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error (development only)"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## 📝 Design & Architecture Choices

1. **OvernightJS**: Chosen for its decorator-based routing system, making code more organized and maintainable

2. **TypeORM**: Provides excellent TypeScript support with decorators and automatic migrations

3. **JWT Authentication**: Stateless authentication perfect for scalable APIs

4. **Role-Based Access**: Implemented to demonstrate security best practices

5. **Environment Variables**: All sensitive config externalized for security

6. **Modular Structure**: Clean separation of concerns (controllers, models, middleware, utils)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC

## 👨‍💻 Author

MindWhiz Team

## 📞 Support

For issues and questions, please open an issue in the repository.

