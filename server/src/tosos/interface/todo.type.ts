export interface TodoInterface {
  id: number;
  title: string;
  description?: string | null;
  done: boolean;
  updated_at: Date;
  created_at: Date;
}
