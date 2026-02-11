export interface Task {
  uuid: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  projectId: number;
  completed: boolean;
}
