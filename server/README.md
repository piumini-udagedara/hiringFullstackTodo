# Todo App - Server (NestJS Backend)

A robust RESTful API server for the Todo application built with NestJS, TypeScript, and MySQL. This backend provides a complete CRUD API with validation, error handling, and Swagger documentation.

## Features

- ✅ **RESTful API** - Full CRUD operations for todos
- ✅ **TypeORM Integration** - Type-safe database operations with MySQL
- ✅ **Data Validation** - Request validation using class-validator
- ✅ **Swagger Documentation** - Interactive API documentation
- ✅ **CORS Enabled** - Cross-origin resource sharing configured
- ✅ **Error Handling** - Comprehensive error handling with proper HTTP status codes
- ✅ **Type Safety** - Full TypeScript support throughout
- ✅ **Auto-sync Database** - Automatic database schema synchronization (development)

## Tech Stack

- **NestJS 10** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **TypeORM** - Object-Relational Mapping
- **MySQL** - Relational database
- **class-validator** - Validation decorators
- **class-transformer** - Object transformation
- **Swagger/OpenAPI** - API documentation
- **Jest** - Testing framework

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MySQL (v8.0 or higher)
- MySQL database created

## Installation

1. Install dependencies:

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the root of the server directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=todo_db

# Server Configuration
PORT=3001
```

**Note:** Make sure to create the MySQL database before running the application. The database name should match `DB_DATABASE` in your `.env` file.

## Database Setup

1. Create a MySQL database:

```sql
CREATE DATABASE todo_db;
```

2. Update the database schema (if needed):

The `description` column should allow NULL values:

```sql
ALTER TABLE todos MODIFY COLUMN description VARCHAR(500) NULL;
```

The application uses `synchronize: true` in development mode, which automatically creates/updates the database schema based on your entities. **Note:** This should be set to `false` in production.

## Running the Application

### Development Mode

Start the server in watch mode (auto-reload on changes):

```bash
npm run start:dev
```

The server will be available at `http://localhost:3001/api`

### Production Mode

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start:prod
```

### Debug Mode

Start the server in debug mode:

```bash
npm run start:debug
```

## API Documentation (Swagger)

Once the server is running, access the interactive Swagger API documentation at:

```
http://localhost:3001/api
```

The Swagger UI provides:

- Complete API endpoint documentation
- Request/response schemas
- Try-it-out functionality
- Example requests

## API Endpoints

### Todos

| Method   | Endpoint                | Description                      | Request Body                              |
| -------- | ----------------------- | -------------------------------- | ----------------------------------------- |
| `GET`    | `/api/todos`            | Get all todos                    | -                                         |
| `GET`    | `/api/todos/:id`        | Get a single todo by ID          | -                                         |
| `POST`   | `/api/todos`            | Create a new todo                | `{ title: string, description?: string }` |
| `PUT`    | `/api/todos/:id`        | Update a todo                    | `{ title: string, description?: string }` |
| `PATCH`  | `/api/todos/:id/status` | Update todo status (done/undone) | `{ done: boolean }`                       |
| `DELETE` | `/api/todos/:id`        | Delete a todo                    | -                                         |

### Request/Response Examples

#### Create Todo

**Request:**

```json
POST /api/todos
{
  "title": "Complete project",
  "description": "Finish the todo app implementation"
}
```

**Response:**

```json
{
  "message": "Todo created successfully"
}
```

#### Get All Todos

**Request:**

```
GET /api/todos
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the todo app implementation",
    "done": false,
    "created_at": "2025-12-13T00:00:00.000Z",
    "updated_at": "2025-12-13T00:00:00.000Z"
  }
]
```

#### Update Todo Status

**Request:**

```json
PATCH /api/todos/1/status
{
  "done": true
}
```

**Response:**

```json
{
  "message": "Todo Done status updated successfully"
}
```

## Project Structure

```
server/
├── src/
│   ├── tosos/                    # Todos module
│   │   ├── dto/                 # Data Transfer Objects
│   │   │   ├── create-todo.dto.ts
│   │   │   ├── update-todo.dto.ts
│   │   │   └── status-todo.dto.ts
│   │   ├── entity/              # Database entities
│   │   │   └── todos.entity.ts
│   │   ├── interface/          # TypeScript interfaces
│   │   │   └── todo.type.ts
│   │   ├── todos.controller.ts  # REST controller
│   │   ├── todos.service.ts     # Business logic
│   │   └── todos.module.ts      # Module definition
│   ├── app.module.ts            # Root module
│   ├── app.controller.ts        # Root controller
│   └── main.ts                  # Application entry point
├── test/                        # E2E tests
├── .env                         # Environment variables (create this)
├── package.json
├── tsconfig.json
└── nest-cli.json
```

## Data Models

### Todo Entity

```typescript
{
  id: number; // Auto-generated primary key
  title: string; // Required, max 255 characters
  description: string | null; // Optional, max 500 characters
  done: boolean; // Default: false
  created_at: Date; // Auto-generated
  updated_at: Date; // Auto-updated
}
```

## Validation

The API uses `class-validator` for request validation:

- **CreateTodoDto**: `title` is required (string), `description` is optional (string)
- **UpdateTodoDto**: `title` is required (string), `description` is optional (string | null)
- **StatusUpdateTodoDto**: `done` is required (boolean)

Invalid requests will return a `400 Bad Request` with validation error details.

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful GET, PUT, PATCH requests
- `201 Created` - Successful POST requests
- `400 Bad Request` - Validation errors
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors

## CORS Configuration

CORS is enabled with the following configuration:

- **Origin**: All origins allowed (`origin: true`)
- **Methods**: GET, HEAD, PUT, PATCH, POST, DELETE
- **Credentials**: Enabled
- **Preflight**: Handled automatically

## Testing

### Unit Tests

Run unit tests:

```bash
npm run test
```

### Watch Mode

Run tests in watch mode:

```bash
npm run test:watch
```

### Coverage

Generate test coverage report:

```bash
npm run test:cov
```

### E2E Tests

Run end-to-end tests:

```bash
npm run test:e2e
```

## Available Scripts

- `npm run build` - Build the application
- `npm run format` - Format code using Prettier
- `npm run start` - Start the application
- `npm run start:dev` - Start in development/watch mode
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Generate test coverage
- `npm run test:e2e` - Run e2e tests

## Development Notes

### Database Synchronization

The application uses `synchronize: true` in development, which automatically syncs the database schema with your entities. **Important:** Set this to `false` in production and use migrations instead.

### Global Validation Pipe

The application uses a global validation pipe with:

- `whitelist: true` - Strips non-whitelisted properties
- `transform: true` - Automatically transforms payloads to DTO instances
- `forbidNonWhitelisted: true` - Throws error if non-whitelisted properties are present
- `skipMissingProperties: false` - Validates all required properties

### Port Configuration

The default port is `3001`. You can override it by setting the `PORT` environment variable.

## Troubleshooting

### Database Connection Issues

- Verify MySQL is running
- Check database credentials in `.env`
- Ensure the database exists
- Verify network connectivity

### Port Already in Use

If port 3001 is already in use, either:

- Stop the other application using the port
- Change the `PORT` in your `.env` file

### Schema Sync Issues

If you encounter schema sync errors:

- Check entity definitions
- Verify database permissions
- Review TypeORM logs
- Consider disabling `synchronize` and using migrations

## License

This project is private and proprietary.
