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
- ✅ **Inline Editing** - Edit todos directly in the list without navigation
- ✅ **Form Validation** - Client-side validation for todo creation

## Tech Stack

- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TanStack Query (React Query) v5** - Powerful data fetching and state management
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running on `http://localhost:3001/api`

## Installation

1. Clone the repository and navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

Vite provides:

- Fast HMR (Hot Module Replacement)
- Optimized builds
- Native ES modules support

### Build for Production

Build the application for production with optimizations:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

### Preview Production Build

Preview the production build locally to test before deployment:

```bash
npm run preview
```

## Project Structure

```
client/
├── src/
│   ├── api/                    # API integration layer
│   │   ├── hooks/              # React Query custom hooks
│   │   │   ├── createTodo.ts   # Create todo mutation hook
│   │   │   ├── deleteTodo.ts   # Delete todo mutation hook
│   │   │   ├── getTodos.ts     # Fetch all todos query hook
│   │   │   ├── getTodoById.ts  # Fetch single todo query hook
│   │   │   ├── updateTodo.ts   # Update todo mutation hook
│   │   │   └── statusUpdateTodo.ts # Update todo status hook
│   │   ├── _apiService.ts      # HTTP service class (fetch-based)
│   │   ├── _apiUtils.ts         # API utility functions
│   │   └── _types.ts           # API error types
│   ├── components/             # React components
│   │   ├── Todo/               # Todo-related components
│   │   │   ├── NewTodoForm.tsx # Form for creating new todos
│   │   │   ├── TodoList.tsx    # Container for todo items
│   │   │   └── TodoListItem.tsx # Individual todo item component
│   │   ├── button/             # Reusable button component
│   │   │   └── button.tsx
│   │   ├── input/              # Input components
│   │   │   ├── Input.tsx        # Text input component
│   │   │   └── Textarea.tsx    # Textarea component
│   │   └── layout/             # Layout components
│   │       └── Header.tsx       # Application header
│   ├── configs/                 # Configuration files
│   │   └── appConfig.ts         # API base URL configuration
│   ├── types/                   # TypeScript type definitions
│   │   └── todo.type.ts        # Todo-related interfaces
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── package.json
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── tailwind.config.js           # Tailwind CSS configuration
```

## API Configuration

The API base URL is configured in `src/configs/appConfig.ts`. By default, it points to:

```typescript
export const BASE_URL = "http://localhost:3001/api";
```

To change the API endpoint, update the `BASE_URL` constant in the config file.

### Environment-based Configuration

For different environments, you can modify the config:

```typescript
// Development
export const BASE_URL = "http://localhost:3001/api";

// Production
export const BASE_URL = "https://api.example.com/api";
```

## Type Definitions

### TodoInterface

```typescript
interface TodoInterface {
  id: number;
  title: string;
  description?: string | undefined;
  done: boolean;
  updated_at: string | null;
  created_at: string | null;
}
```

### CreateTodoI

```typescript
interface CreateTodoI {
  title: string;
  description?: string;
}
```

### UpdateTodoI

```typescript
interface UpdateTodoI {
  id: number;
  title: string;
  description?: string | null;
}
```

### StatusUpdateTodoI

```typescript
interface StatusUpdateTodoI {
  id: number;
  done: boolean;
}
```

## React Query Hooks

The application uses custom React Query hooks for all API operations:

### useGetTodos

Fetches all todos from the API:

```typescript
const { data, isLoading, error } = useGetTodos();
```

- **Returns**: `{ data, isLoading, error, refetch }`
- **Auto-refetches**: On window focus (disabled), on mount
- **Cache key**: `["todos"]`

### useGetTodoById

Fetches a single todo by ID:

```typescript
const { data, isLoading, error } = useGetTodoById(todoId);
```

- **Returns**: `{ data, isLoading, error }`
- **Enabled**: Only when `id` is provided
- **Cache key**: `["todos", id]`

### useAddTodo

Creates a new todo:

```typescript
const { mutate: addTodo } = useAddTodo();

// Usage
addTodo({ title: "New Todo", description: "Optional description" });
```

- **Auto-invalidates**: `["todos"]` query on success
- **Error handling**: Logs errors to console

### useUpdateTodo

Updates an existing todo:

```typescript
const { mutate: updateTodo } = useUpdateTodo();

// Usage
updateTodo({
  id: 1,
  title: "Updated Title",
  description: "Updated description",
});
```

- **Auto-invalidates**: `["todos"]` query on success

### useStatusUpdateTodo

Updates todo status (done/undone):

```typescript
const { mutate: statusUpdateTodo } = useStatusUpdateTodo();

// Usage
statusUpdateTodo({ id: 1, done: true });
```

- **Auto-invalidates**: `["todos"]` query on success

### useDeleteTodo

Deletes a todo:

```typescript
const { mutate: deleteTodo } = useDeleteTodo();

// Usage
deleteTodo({ id: 1 });
```

- **Auto-invalidates**: `["todos"]` query on success

## Component Details

### NewTodoForm

Form component for creating new todos with:

- Title input (required)
- Description textarea (optional)
- Form validation
- Submit handler

**Props:**

```typescript
interface NewTodoFormProps {
  addTodo: (data: CreateTodoI) => void;
}
```

### TodoList

Container component that displays a list of todos.

**Props:**

```typescript
interface TodoListProps {
  todos: TodoInterface[];
  toggleTodo: (value: { id: number; stuts: boolean }) => void;
  deleteTodo: (id: number) => void;
  editTodo: (value: {
    id: number;
    title: string;
    description?: string | null;
  }) => void;
}
```

### TodoListItem

Individual todo item component with:

- Checkbox for toggling done status
- Inline editing capability
- Edit and delete buttons
- Conditional rendering based on done status

**Props:**

```typescript
interface TodoListItemProps {
  todo: TodoInterface;
  toggleTodo: (value: { id: number; stuts: boolean }) => void;
  deleteTodo: (id: number) => void;
  editTodo: (value: {
    id: number;
    title: string;
    description?: string | null;
  }) => void;
}
```

## Features in Detail

### React Query Integration

The app leverages TanStack Query v5 for efficient data management:

- **Automatic Caching**: Todos are cached and shared across components
- **Background Updates**: Data is refetched in the background when stale
- **Optimistic Updates**: UI updates immediately (can be added for better UX)
- **Automatic Invalidation**: Queries are invalidated after mutations
- **Built-in States**: Loading, error, and success states are handled automatically
- **Request Deduplication**: Multiple components requesting the same data share one request

### State Management

- **Server State**: Managed by React Query (todos, loading, errors)
- **Local State**: Component-level state for UI interactions (editing mode, form inputs)
- **No Global Store**: No Redux or Context needed for this application

### HTTP Service

The `HttpService` class provides:

- **Timeout Handling**: 30-second request timeout
- **Error Parsing**: Consistent error message extraction
- **Credentials**: Includes cookies for authentication (if needed)
- **Type Safety**: Fully typed request/response handling

### Error Handling

Errors are handled at multiple levels:

1. **API Level**: HTTP service catches and formats errors
2. **Hook Level**: React Query hooks handle error states
3. **Component Level**: UI displays user-friendly error messages

Example error display:

```typescript
if (error) {
  return <div>Error loading todos: {error.msg || "Unknown error"}</div>;
}
```

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Development

### Code Style

The project uses:

- **ESLint** - Code linting with React and TypeScript rules
- **TypeScript** - Strict type checking
- **Prettier** - Code formatting (if configured)

### Type Safety

All API responses and component props are fully typed:

- TypeScript interfaces for all data structures
- Type-safe API hooks
- Compile-time error checking

### Adding New Features

1. **New API Endpoint**: Create a hook in `src/api/hooks/`
2. **New Component**: Add to `src/components/`
3. **New Type**: Add to `src/types/`
4. **Update Types**: Keep TypeScript interfaces in sync with backend

## Troubleshooting

### CORS Issues

If you encounter CORS errors:

1. **Verify Backend**: Ensure the backend server is running
2. **Check CORS Config**: Verify CORS is enabled on the backend
3. **Check URL**: Ensure `BASE_URL` in `appConfig.ts` matches your backend URL
4. **Check Port**: Verify backend is running on the expected port (default: 3001)

### API Connection Issues

**Symptoms**: Network errors, failed requests

**Solutions**:

- Verify the backend server is running on port 3001
- Check the `BASE_URL` in `src/configs/appConfig.ts`
- Ensure the backend API is accessible
- Check browser console for detailed error messages
- Verify network connectivity

### Build Issues

**TypeScript Errors**:

```bash
npm run build
```

Check the error output and fix type issues.

**Vite Build Errors**:

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### React Query Not Updating

If data doesn't update after mutations:

- Check that hooks are using `invalidateQueries` in `onSuccess`
- Verify query keys match between queries and invalidations
- Check browser console for errors

### Port Already in Use

If port 5173 is already in use:

- Vite will automatically use the next available port
- Or specify a port: `npm run dev -- --port 3000`

## Performance Considerations

- **Code Splitting**: Vite automatically splits code for optimal loading
- **Tree Shaking**: Unused code is removed in production builds
- **React Query Caching**: Reduces unnecessary API calls
- **Optimized Builds**: Production builds are minified and optimized
