import { taskEditFormSchema, taskFormSchema } from "~~/shared/schemas/task";
import type { TaskFormData } from "~~/shared/types/task";

export default function useTaskValidation() {
  function validateTaskCreate(task: TaskFormData) {
    return taskFormSchema.safeParse(task);
  }

  function validateTaskUpdate(task: TaskFormData) {
    return taskEditFormSchema.safeParse(task);
  }

  return {
    validateTaskCreate,
    validateTaskUpdate,
  };
}
