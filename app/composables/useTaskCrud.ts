import type { TaskFormData } from "~~/shared/types/task";

export default function useTaskCrud() {
  const {
    addTask,
    editTask: editTaskState,
    deleteTask: deleteTaskState,
  } = useProjectStore();

  function createTask(task: TaskFormData, projectId: Project["id"]) {
    addTask({
      ...task,
      uuid: self.crypto.randomUUID(),
      projectId,
    });
  }

  function editTask(task: Task) {
    editTaskState(task);
  }

  function deleteTask(uuid: string) {
    deleteTaskState(uuid);
  }

  return {
    createTask,
    editTask,
    deleteTask,
  };
}
