import type { Task } from "~~/shared/types/task";
import type { TaskPriorityEnum } from "~~/shared/enums/task";
import type { CompletedFilter, SortBy } from "~~/shared/types/taskFilter";

const PRIORITY_ORDER: Record<string, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export default function useTaskFilters(tasks: ComputedRef<Task[]>) {
  const completedFilter = shallowRef<CompletedFilter>("all");
  const priorityFilter = shallowRef<TaskPriorityEnum | "all">("all");
  const sortBy = shallowRef<SortBy>(null);

  function toggleSort(field: SortBy) {
    sortBy.value = sortBy.value === field ? null : field;
  }

  const filteredTasks = computed(() => {
    const filtered = tasks.value.filter((task) => {
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

    if (sortBy.value === "priority") {
      return filtered.toSorted(
        (a, b) =>
          (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3),
      );
    }

    if (sortBy.value === "dueDate") {
      return filtered.toSorted(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      );
    }

    return filtered;
  });

  return {
    completedFilter,
    priorityFilter,
    sortBy,
    filteredTasks,
    toggleSort,
  };
}
