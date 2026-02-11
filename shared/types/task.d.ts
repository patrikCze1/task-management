export interface Task {
  uuid: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  projectId: string;
  completed: boolean;
}

export type TaskFormData = Omit<Task, "uuid" | "projectId">;
