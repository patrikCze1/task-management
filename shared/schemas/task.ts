import { z } from "zod";
import { TaskPriorityEnum } from "../enums/task";

export const taskSchema = z.object({
  uuid: z.uuid(),
  title: z.string().min(3).max(100),
  description: z.string().max(1000).optional(),
  dueDate: z.iso.datetime().refine((date) => new Date(date) > new Date(), {
    message: "Due date must be in the future",
  }),
  priority: z.enum(TaskPriorityEnum),
  projectId: z.number(),
  completed: z.boolean(),
});

export const taskFormSchema = taskSchema.omit({
  uuid: true,
  projectId: true,
});

export const taskEditFormSchema = taskFormSchema.extend({
  dueDate: z.iso.datetime(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
export type TaskFormSchema = z.infer<typeof taskFormSchema>;
