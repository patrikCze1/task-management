import type { Project } from "~~/shared/types/project";

export const useProjectStore = defineStore("projects", () => {
  const projects = shallowRef<Project[]>([]);
  const tasks = shallowRef<Task[]>([]);
  const initiliazed = shallowRef(false);

  function init() {
    projects.value = JSON.parse(localStorage.getItem("projects") ?? "[]");
    tasks.value = JSON.parse(localStorage.getItem("projects") ?? "[]");

    initiliazed.value = true;
  }

  function getProject(id: string) {
    return projects.value.find((p) => p.id === id);
  }

  function addProject(project: Project) {
    projects.value = [...projects.value, project];

    saveState();
  }

  function addTask(task: Task) {
    tasks.value = [...tasks.value, task];

    saveState();
  }

  function editTask(task: Task) {
    tasks.value = tasks.value.map((t) => {
      if (t.uuid === task.uuid) {
        return task;
      }
      return t;
    });

    saveState();
  }

  function deleteTask(uuid: string) {
    tasks.value = tasks.value.filter((p) => p.uuid !== uuid);

    saveState();
  }

  function saveState() {
    localStorage.setItem("projects", JSON.stringify(projects.value));
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  }

  return {
    initiliazed,
    projects,
    tasks,
    init,
    getProject,
    addProject,
    addTask,
    editTask,
    deleteTask,
  };
});
