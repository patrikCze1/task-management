<script lang="ts" setup>
import { TaskPriorityEnum } from "~~/shared/enums/task";
import type { CompletedFilter, SortBy } from "~~/shared/types/taskFilter";

const completedFilter = defineModel<CompletedFilter>("completed", {
  required: true,
});
const priorityFilter = defineModel<TaskPriorityEnum | "all">("priority", {
  required: true,
});

const props = defineProps<{
  sortBy: SortBy;
}>();

const emit = defineEmits<{
  toggleSort: [field: SortBy];
}>();

const sortOptions: { label: string; value: SortBy }[] = [
  { label: "Priority", value: "priority" },
  { label: "Due date", value: "dueDate" },
];

const completedOptions: { label: string; value: CompletedFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

const priorityOptions: { label: string; value: TaskPriorityEnum | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Low", value: TaskPriorityEnum.Low },
  { label: "Medium", value: TaskPriorityEnum.Medium },
  { label: "High", value: TaskPriorityEnum.High },
];

const btnBase = "rounded-full px-3 py-1 text-xs font-medium transition-colors";
const btnActive = "bg-blue-600 text-white dark:bg-blue-500";
const btnInactive =
  "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600";
</script>

<template>
  <div class="mb-4 flex flex-wrap items-center gap-4">
    <div class="flex items-center gap-1.5">
      <span class="mr-1 text-xs font-medium text-gray-500 dark:text-gray-400">
        Status
      </span>
      <button
        v-for="opt in completedOptions"
        :key="opt.value"
        :class="[
          btnBase,
          completedFilter === opt.value ? btnActive : btnInactive,
        ]"
        @click="completedFilter = opt.value"
      >
        {{ opt.label }}
      </button>
    </div>

    <div class="flex items-center gap-1.5">
      <span class="mr-1 text-xs font-medium text-gray-500 dark:text-gray-400">
        Priority
      </span>
      <button
        v-for="opt in priorityOptions"
        :key="opt.value"
        :class="[
          btnBase,
          priorityFilter === opt.value ? btnActive : btnInactive,
        ]"
        @click="priorityFilter = opt.value"
      >
        {{ opt.label }}
      </button>
    </div>

    <div class="flex items-center gap-1.5">
      <span class="mr-1 text-xs font-medium text-gray-500 dark:text-gray-400">
        Sort
      </span>
      <button
        v-for="opt in sortOptions"
        :key="opt.value!"
        :class="[btnBase, props.sortBy === opt.value ? btnActive : btnInactive]"
        @click="emit('toggleSort', opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>
