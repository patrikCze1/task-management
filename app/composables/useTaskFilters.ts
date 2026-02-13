import type { Task } from "~~/shared/types/task";
import type { TaskPriorityEnum } from "~~/shared/enums/task";
import type { CompletedFilter } from "~~/shared/types/taskFilter";

export default function useTaskFilters(tasks: ComputedRef<Task[]>) {
  const completedFilter = shallowRef<CompletedFilter>("all");
  const priorityFilter = shallowRef<TaskPriorityEnum | "all">("all");

  const filteredTasks = computed(() => {
    return tasks.value.filter((task) => {
      if (completedFilter.value === "active" && task.completed) return false;
      if (completedFilter.value === "completed" && !task.completed)
        return false;
      if (
        priorityFilter.value !== "all" &&
        task.priority !== priorityFilter.value
      )
        return false;
      return true;
    });
  });

  return {
    completedFilter,
    priorityFilter,
    filteredTasks,
  };
}
