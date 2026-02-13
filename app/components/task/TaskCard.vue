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
        <button
          class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
          :class="
            task.completed
              ? 'border-blue-600 bg-blue-600 dark:border-blue-500 dark:bg-blue-500'
              : 'border-gray-300 hover:border-blue-400 dark:border-gray-600 dark:hover:border-blue-500'
          "
          @click.stop="$emit('toggle', task.uuid)"
        >
          <svg
            v-if="task.completed"
            class="h-3 w-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
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
