# MindWhiz — API

A REST API for an e-commerce module, built with Express, TypeScript, PostgreSQL and OvernightJS.
JWT authentication with bcrypt password hashing and role-based access control.

Pairs with the [MindWhiz frontend](https://github.com/asaleem029/mindwhiz-web).

> **Scope:** built as a focused technical exercise. Auth and RBAC are real, not mocked,
> but the domain is deliberately small — products and users only.

## Stack

Express · TypeScript · PostgreSQL · TypeORM · OvernightJS · JWT · bcrypt

## Design decisions

**OvernightJS** for decorator-based routing — keeps route definitions next to their
handlers rather than in a separate routing table, which stays readable as controllers grow.

**TypeORM** for first-class TypeScript support via decorators, so entity definitions and
types share one source of truth instead of drifting apart.

**Stateless JWT** rather than server-side sessions — no shared session store needed, so
the API scales horizontally without sticky sessions.

**RBAC in middleware, not controllers** — role checks sit in `middleware/auth.ts` and are
applied per route, so a new protected endpoint can't accidentally ship without a check.

**Config fully externalised** — every secret and connection detail comes from environment
variables, nothing committed.

## Features

- JWT authentication with bcrypt-hashed passwords
- Role-based access control — Admin and Customer
- Product CRUD with admin-only creation
- Consistent response envelope across all endpoints
- Seed script for reproducible local data

## Prerequisites

- Node.js >= 18
- PostgreSQL >= 12

## Installation

```bash
git clone https://github.com/asaleem029/mindwhiz-api.git
cd mindwhiz-api
npm install
cp .env.example .env
```

Configure `.env`:

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

Create the database:

```bash
psql -U postgres -c "CREATE DATABASE mindwhiz_ecommerce;"
```

Seed it — creates tables, two users and eight sample products:

```bash
npm run seed
```

## Running

```bash
npm run dev      # development, http://localhost:5000
npm run build && npm start   # production
```

**Seeded users**

| Email | Password | Role |
|---|---|---|
| `admin@mindwhiz.com` | `admin123` | admin |
| `customer@mindwhiz.com` | `customer123` | customer |

## API

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| `GET` | `/health` | — | Health check |
| `POST` | `/api/auth/login` | — | Authenticate, returns JWT |
| `POST` | `/api/auth/register` | — | Create account |
| `GET` | `/api/products` | — | List products |
| `GET` | `/api/products/:id` | — | Product details |
| `POST` | `/api/products` | Admin | Create product |

### Login

```http
POST /api/auth/login
```

```json
{
  "email": "admin@mindwhiz.com",
  "password": "admin123"
}
```

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

### Create product (Admin only)

```http
POST /api/products
Authorization: Bearer <jwt_token>
```

```json
{
  "name": "New Product",
  "description": "Product description here",
  "price": 99.99,
  "availability": "in_stock",
  "imageUrl": "https://example.com/image.jpg"
}
```

Returns `403` if the token belongs to a customer.

### Errors

All errors share one shape:

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error (development only)"
}
```

`200` Success · `201` Created · `400` Bad Request · `401` Unauthorized ·
`403` Forbidden · `404` Not Found · `409` Conflict · `500` Server Error

Detailed error text is suppressed outside development so internals aren't leaked to clients.

## Authentication flow

1. Client posts credentials to `/api/auth/login`
2. Server verifies the bcrypt hash
3. Server signs a JWT carrying `userId`, `email` and `role`
4. Client sends it as `Authorization: Bearer <token>`
5. Middleware verifies the signature, then checks role before the handler runs

## Environment variables

| Variable | Description | Default |
|---|---|---|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `5000` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | — |
| `DB_NAME` | Database name | `mindwhiz_ecommerce` |
| `JWT_SECRET` | JWT signing secret | — |

## Testing

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mindwhiz.com","password":"admin123"}'

# List products
curl http://localhost:5000/api/products

# Create product (admin token required)
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"New Product","description":"Product description","price":99.99,"availability":"in_stock"}'
```

## Project structure

```
src/
  config/database.ts        # Connection and TypeORM config
  controllers/
    authController.ts       # Login, register
    productController.ts    # Product CRUD
    baseController.ts
  middleware/auth.ts        # JWT verification and RBAC
  models/
    userModel.ts
    productModel.ts
  database/seed.ts          # Reproducible local data
  utils/
    interfaces.ts
    responses.ts
