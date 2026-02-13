import { describe, it, expect, beforeEach } from "vitest";

describe("useTaskCrud", () => {
  const formData = {
    title: "Test task",
    description: "A description",
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    priority: "medium",
    completed: false,
  };

  beforeEach(() => {
    const store = useProjectStore();
    store.tasks = [];
    store.projects = [];
  });

  describe("createTask", () => {
    it("adds a task to the store with uuid and projectId", () => {
      const store = useProjectStore();
      const { createTask } = useTaskCrud();

      createTask(formData, "project-1");

      expect(store.tasks).toHaveLength(1);
      expect(store.tasks[0]).toMatchObject({
        ...formData,
        projectId: "project-1",
      });
    });

    it("generates a valid uuid", () => {
      const store = useProjectStore();
      const { createTask } = useTaskCrud();

      createTask(formData, "project-1");

      expect(store.tasks[0]!.uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      );
    });

    it("generates unique uuids for each task", () => {
      const { createTask } = useTaskCrud();
      const store = useProjectStore();

      createTask(formData, "project-1");
      createTask(formData, "project-1");

      expect(store.tasks[0]!.uuid).not.toBe(store.tasks[1]!.uuid);
    });
  });

  describe("editTask", () => {
    it("updates an existing task in the store", () => {
      const store = useProjectStore();
      const { createTask, editTask } = useTaskCrud();

      createTask(formData, "project-1");
      const task = store.tasks[0]!;

      editTask({ ...task, title: "Updated title" });

      expect(store.tasks).toHaveLength(1);
      expect(store.tasks[0]!.title).toBe("Updated title");
    });

    it("does not modify other tasks", () => {
      const store = useProjectStore();
      const { createTask, editTask } = useTaskCrud();

      createTask(formData, "project-1");
      createTask({ ...formData, title: "Second task" }, "project-1");
      const firstTask = store.tasks[0]!;

      editTask({ ...firstTask, title: "Updated" });

      expect(store.tasks[1]!.title).toBe("Second task");
    });
  });

  describe("deleteTask", () => {
    it("removes a task from the store", () => {
      const store = useProjectStore();
      const { createTask, deleteTask } = useTaskCrud();

      createTask(formData, "project-1");
      const uuid = store.tasks[0]!.uuid;

      deleteTask(uuid);

      expect(store.tasks).toHaveLength(0);
    });

    it("only removes the targeted task", () => {
      const store = useProjectStore();
      const { createTask, deleteTask } = useTaskCrud();

      createTask(formData, "project-1");
      createTask({ ...formData, title: "Keep me" }, "project-1");
      const uuid = store.tasks[0]!.uuid;

      deleteTask(uuid);

      expect(store.tasks).toHaveLength(1);
      expect(store.tasks[0]!.title).toBe("Keep me");
    });
  });
});
