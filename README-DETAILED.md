# NestJS GraphQL CRUD Project with MongoDB

A comprehensive NestJS application featuring GraphQL API with full CRUD operations for user management, built with MongoDB Atlas integration and industry-standard architecture patterns.

## 🚀 Features

- **GraphQL API** with Apollo Server
- **MongoDB Atlas** integration with Mongoose ODM
- **Complete CRUD Operations** for User entity
- **Input Validation** with class-validator
- **Error Handling** with custom exception filters
- **Logging** with interceptors
- **Scalable Architecture** following NestJS best practices
- **Type Safety** with TypeScript
- **Auto-generated GraphQL Schema**

## 📁 Project Structure

```
src/
├── common/                 # Shared utilities and components
│   ├── decorators/        # Custom decorators
│   ├── exceptions/        # Custom exceptions
│   ├── filters/          # Exception filters
│   ├── guards/           # Authorization guards
│   ├── interceptors/     # Request/response interceptors
│   └── pipes/            # Validation pipes
├── config/               # Configuration files
│   └── database.config.ts
├── modules/              # Feature modules
│   └── user/            # User module
│       ├── dto/         # Data Transfer Objects
│       ├── entities/    # Database entities/schemas
│       ├── user.module.ts
│       ├── user.resolver.ts
│       └── user.service.ts
├── app.module.ts         # Root module
└── main.ts              # Application entry point
```

## 🛠 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   
   Update the `.env` file with your MongoDB Atlas connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
   PORT=3000
   NODE_ENV=development
   GRAPHQL_PLAYGROUND=true
   GRAPHQL_DEBUG=true
   GRAPHQL_INTROSPECTION=true
   ```

3. **Start the application**:
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run start:prod
   ```

## 📊 MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [mongodb.com](https://mongodb.com)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" button
5. Replace `<username>`, `<password>`, and `<database_name>` in the connection string
6. Add the connection string to your `.env` file

## 🎯 GraphQL API Usage

Once the application is running, visit:

- **GraphQL Playground**: `http://localhost:3000/graphql`
- **API Endpoint**: `http://localhost:3000/graphql`

### Available Operations

#### Queries

```graphql
# Get all users with pagination
query GetUsers($page: Int, $limit: Int, $search: String) {
  users(page: $page, limit: $limit, search: $search) {
    users {
      _id
      firstName
      lastName
      email
      phone
      age
      gender
      bio
      isActive
      createdAt
      updatedAt
    }
    total
    page
    limit
    totalPages
  }
}

# Get user by ID
query GetUser($id: ID!) {
  user(id: $id) {
    _id
    firstName
    lastName
    email
    phone
    age
    gender
    bio
    isActive
    createdAt
    updatedAt
  }
}

# Get user by email
query GetUserByEmail($email: String!) {
  userByEmail(email: $email) {
    _id
    firstName
    lastName
    email
  }
}
```

#### Mutations

```graphql
# Create a new user
mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    _id
    firstName
    lastName
    email
    phone
    age
    gender
    bio
    isActive
    createdAt
    updatedAt
  }
}

# Update user
mutation UpdateUser($id: ID!, $updateUserInput: UpdateUserInput!) {
  updateUser(id: $id, updateUserInput: $updateUserInput) {
    _id
    firstName
    lastName
    email
    phone
    age
    gender
    bio
    isActive
    updatedAt
  }
}

# Delete user
mutation RemoveUser($id: ID!) {
  removeUser(id: $id) {
    _id
    firstName
    lastName
    email
  }
}

# Deactivate user
mutation DeactivateUser($id: ID!) {
  deactivateUser(id: $id) {
    _id
    isActive
  }
}

# Activate user
mutation ActivateUser($id: ID!) {
  activateUser(id: $id) {
    _id
    isActive
  }
}
```

#### Example Variables

```json
{
  "createUserInput": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "age": 30,
    "gender": "male",
    "bio": "Software developer with 5 years of experience"
  },
  "updateUserInput": {
    "firstName": "Jane",
    "age": 28,
    "bio": "Updated bio information"
  },
  "id": "60d5ecb54e9c8b2f8c8b456a",
  "email": "john.doe@example.com",
  "page": 1,
  "limit": 10,
  "search": "john"
}
```

## 🔧 Development

```bash
# Run in watch mode
npm run start:dev

# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Check test coverage
npm run test:cov
```

## 🏗 Architecture Highlights

### Validation
- **Input validation** using `class-validator` decorators
- **MongoDB ObjectId validation** with custom pipes
- **Data transformation** and sanitization

### Error Handling
- **Custom GraphQL exception filter** for consistent error responses
- **HTTP exception mapping** to GraphQL errors
- **Proper error codes** and messaging

### Logging
- **Request/response logging** with interceptors
- **Operation timing** and performance monitoring
- **Structured logging** for debugging

### Database
- **Mongoose ODM** with schema validation
- **Database indexing** for optimal query performance
- **Connection handling** with retry logic

## 🚀 Next Steps

1. **Add your MongoDB Atlas connection string** to the `.env` file
2. **Run `npm run start:dev`** to start the development server
3. **Visit `http://localhost:3000/graphql`** to access GraphQL Playground
4. **Test the CRUD operations** using the provided GraphQL queries

## 📝 API Documentation

The GraphQL schema is automatically generated and available at the GraphQL Playground endpoint. The schema includes:

- **Type definitions** for all entities
- **Input types** for mutations
- **Query arguments** with validation
- **Field descriptions** and documentation

## 📄 License

This project is licensed under the MIT License.