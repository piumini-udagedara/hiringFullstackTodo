export interface TodoInterface {
  id: number;
  title: string;
  description?: string | undefined;
  done: boolean;
  updated_at: string | null;
  created_at: string | null;
}
export interface CreateTodoI {
  title: string;
  description?: string;
}

export interface UpdateTodoI {
  id: number;
  title: string;
  description?: string | null;
}

export interface StatusUpdateTodoI {
  id: number;
  done: boolean;
}
