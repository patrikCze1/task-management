import { describe, it, expect } from "vitest";
import {
  taskSchema,
  taskFormSchema,
  taskEditFormSchema,
} from "../../shared/schemas/task";

const futureDate = new Date(
  Date.now() + 24 * 60 * 60 * 1000,
).toISOString();
const pastDate = new Date(
  Date.now() - 24 * 60 * 60 * 1000,
).toISOString();

const validTask = {
  uuid: "550e8400-e29b-41d4-a716-446655440000",
  title: "Test task",
  description: "A description",
  dueDate: futureDate,
  priority: "medium" as const,
  projectId: 1,
  completed: false,
};

describe("taskSchema", () => {
  it("accepts a valid task", () => {
    const result = taskSchema.safeParse(validTask);
    expect(result.success).toBe(true);
  });

  // uuid
  it("rejects invalid uuid", () => {
    const result = taskSchema.safeParse({ ...validTask, uuid: "not-a-uuid" });
    expect(result.success).toBe(false);
  });

  // title
  it("rejects title shorter than 3 characters", () => {
    const result = taskSchema.safeParse({ ...validTask, title: "ab" });
    expect(result.success).toBe(false);
  });

  it("rejects title longer than 100 characters", () => {
    const result = taskSchema.safeParse({
      ...validTask,
      title: "a".repeat(101),
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing title", () => {
    const { title, ...noTitle } = validTask;
    const result = taskSchema.safeParse(noTitle);
    expect(result.success).toBe(false);
  });

  // description
  it("accepts missing description", () => {
    const { description, ...noDesc } = validTask;
    const result = taskSchema.safeParse(noDesc);
    expect(result.success).toBe(true);
  });

  it("rejects description longer than 1000 characters", () => {
    const result = taskSchema.safeParse({
      ...validTask,
      description: "a".repeat(1001),
    });
    expect(result.success).toBe(false);
  });

  // dueDate
  it("rejects a past due date", () => {
    const result = taskSchema.safeParse({ ...validTask, dueDate: pastDate });
    expect(result.success).toBe(false);
  });

  it("rejects non-ISO date string", () => {
    const result = taskSchema.safeParse({
      ...validTask,
      dueDate: "next friday",
    });
    expect(result.success).toBe(false);
  });

  // priority
  it.each(["low", "medium", "high"] as const)(
    "accepts priority '%s'",
    (priority) => {
      const result = taskSchema.safeParse({ ...validTask, priority });
      expect(result.success).toBe(true);
    },
  );

  it("rejects invalid priority", () => {
    const result = taskSchema.safeParse({
      ...validTask,
      priority: "urgent",
    });
    expect(result.success).toBe(false);
  });

  // projectId
  it("rejects non-number projectId", () => {
    const result = taskSchema.safeParse({
      ...validTask,
      projectId: "abc",
    });
    expect(result.success).toBe(false);
  });

  // completed
  it("rejects non-boolean completed", () => {
    const result = taskSchema.safeParse({
      ...validTask,
      completed: "yes",
    });
    expect(result.success).toBe(false);
  });
});

describe("taskFormSchema", () => {
  const validFormData = {
    title: "Test task",
    dueDate: futureDate,
    priority: "medium" as const,
    completed: false,
  };

  it("accepts valid form data without uuid and projectId", () => {
    const result = taskFormSchema.safeParse(validFormData);
    expect(result.success).toBe(true);
  });

  it("rejects past due date on creation", () => {
    const result = taskFormSchema.safeParse({
      ...validFormData,
      dueDate: pastDate,
    });
    expect(result.success).toBe(false);
  });
});

describe("taskEditFormSchema", () => {
  const validEditData = {
    title: "Test task",
    dueDate: pastDate,
    priority: "medium" as const,
    completed: false,
  };

  it("accepts a past due date on edit", () => {
    const result = taskEditFormSchema.safeParse(validEditData);
    expect(result.success).toBe(true);
  });

  it("still validates other fields on edit", () => {
    const result = taskEditFormSchema.safeParse({
      ...validEditData,
      title: "ab",
    });
    expect(result.success).toBe(false);
  });
});
