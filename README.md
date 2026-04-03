# Todo App - Client

A modern, full-featured Todo application built with React, TypeScript, and Vite. This client application provides an intuitive interface for managing todos with real-time updates, CRUD operations, and a responsive design.

## Features

- ✅ **Create Todos** - Add new todos with title and optional description
- ✅ **Read Todos** - View all todos in a clean, organized list
- ✅ **Update Todos** - Edit todo titles and descriptions inline
- ✅ **Delete Todos** - Remove todos with a single click
- ✅ **Toggle Status** - Mark todos as done/undone with checkboxes
- ✅ **Real-time Updates** - Automatic data synchronization using React Query
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile devices
- ✅ **Error Handling** - Graceful error handling with user-friendly messages
- ✅ **Loading States** - Visual feedback during data operations

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Query (React Query)** - Data fetching and state management
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Axios** - HTTP client

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running on `http://localhost:3001/api`

## Installation

1. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Build for Production

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
client/
├── src/
│   ├── api/                    # API integration
│   │   ├── hooks/              # React Query hooks
│   │   │   ├── createTodo.ts
│   │   │   ├── deleteTodo.ts
│   │   │   ├── getTodos.ts
│   │   │   ├── getTodoById.ts
│   │   │   ├── updateTodo.ts
│   │   │   └── statusUpdateTodo.ts
│   │   ├── _apiService.ts      # HTTP service
│   │   ├── _apiUtils.ts        # API utilities
│   │   └── _types.ts           # API types
│   ├── components/             # React components
│   │   ├── Todo/               # Todo-related components
│   │   │   ├── NewTodoForm.tsx
│   │   │   ├── TodoList.tsx
│   │   │   └── TodoListItem.tsx
│   │   ├── button/
│   │   ├── input/
│   │   └── layout/
│   ├── configs/                 # Configuration files
│   │   └── appConfig.ts        # API base URL
│   ├── types/                   # TypeScript types
│   │   └── todo.type.ts
│   ├── App.tsx                  # Main app component
│   └── main.tsx                # Application entry point
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## API Configuration

The API base URL is configured in `src/configs/appConfig.ts`. By default, it points to:

```
http://localhost:3001/api
```

To change the API endpoint, update the `BASE_URL` constant in the config file.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Endpoints

The application communicates with the following API endpoints:

- `GET /todos` - Fetch all todos
- `GET /todos/:id` - Fetch a single todo
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `PATCH /todos/:id/status` - Update todo status (done/undone)
- `DELETE /todos/:id` - Delete a todo

## Features in Detail

### React Query Integration

The app uses TanStack Query for efficient data management:
- Automatic caching and background updates
- Optimistic updates for better UX
- Automatic query invalidation after mutations
- Built-in loading and error states

### Component Architecture

- **NewTodoForm** - Form for creating new todos
- **TodoList** - Container component for displaying todos
- **TodoListItem** - Individual todo item with edit/delete functionality
- **Header** - Application header/navigation

### State Management

- React Query handles server state
- Local component state for UI interactions (editing mode, form inputs)
- No global state management library needed

## Development

### Code Style

The project uses:
- ESLint for code linting
- TypeScript for type checking
- Prettier (if configured) for code formatting

### Type Safety

All API responses and component props are fully typed using TypeScript interfaces defined in `src/types/todo.type.ts`.

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure:
1. The backend server is running
2. CORS is properly configured on the backend
3. The API base URL in `appConfig.ts` matches your backend URL

### API Connection Issues

- Verify the backend server is running on port 3001
- Check the `BASE_URL` in `src/configs/appConfig.ts`
- Ensure the backend API is accessible

# hiringullstackTodo
