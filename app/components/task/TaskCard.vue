<script lang="ts" setup>
import type { Task } from "~~/shared/types/task";

const { task } = defineProps<{
  task: Task;
}>();

defineEmits<{
  toggle: [uuid: string];
  click: [task: Task];
}>();

const priorityClass = computed(() => {
  switch (task.priority) {
    case "high":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    case "medium":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "low":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400";
  }
});

const formatedDate = computed(() =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(task.dueDate)),
);
</script>

<template>
  <article
    class="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    :class="{ 'opacity-60': task.completed }"
    @click="$emit('click', task)"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-start gap-3">
        <input
          type="checkbox"
          :checked="task.completed"
          class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 dark:border-gray-600"
          @click.stop.prevent="$emit('toggle', task.uuid)"
        />
        <div>
          <h2
            class="text-sm font-medium text-gray-900 dark:text-gray-100"
            :class="{
              'line-through text-gray-400 dark:text-gray-500': task.completed,
            }"
          >
            {{ task.title }}
          </h2>
          <p
            v-if="task.dueDate"
            class="mt-1 text-xs text-gray-500 dark:text-gray-400"
          >
            Due {{ formatedDate }}
          </p>
        </div>
      </div>
      <span
        class="inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium"
        :class="priorityClass"
      >
        {{ task.priority }}
      </span>
    </div>
  </article>
</template>
