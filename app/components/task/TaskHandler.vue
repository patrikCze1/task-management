<script lang="ts" setup>
import useProjectDetail from "~/composables/useProjectDetail";
import type { Task, TaskFormData } from "~~/shared/types/task";

const { project } = defineProps<{
  project: Project;
}>();

const route = useRoute();
const { projectTasks } = useProjectDetail(project.id);
const { createTask, editTask, deleteTask } = useTaskCrud();
const { completedFilter, priorityFilter, sortBy, toggleSort, filteredTasks } =
  useTaskFilters(projectTasks);

const initialized = shallowRef(false);
const showTaskForm = shallowRef(false);
const selectedTask = shallowRef<Task | undefined>();

function openForm(task?: Task) {
  selectedTask.value = task;
  showTaskForm.value = true;
}

function onTaskSubmit(data: TaskFormData) {
  if (selectedTask.value) {
    editTask({
      ...data,
      uuid: selectedTask.value.uuid,
      projectId: selectedTask.value.projectId,
    });
  } else {
    createTask(data, project.id);
  }
  showTaskForm.value = false;
}

function onDeleteTask(uuid: string) {
  deleteTask(uuid);
  showTaskForm.value = false;
}

onMounted(() => {
  initialized.value = true;
});
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Project #{{ route.params.id }}</h1>

    <TaskFilters
      v-model:completed="completedFilter"
      v-model:priority="priorityFilter"
      :sort-by="sortBy"
      @toggle-sort="toggleSort"
    />

    <div class="grid grid-cols-1 gap-4">
      <template v-if="!initialized">
        <TaskCardSkeleton v-for="i in 5" :key="i" />
      </template>

      <template v-else>
        <TaskCard
          v-for="task in filteredTasks"
          :key="task.uuid"
          :task
          @click="openForm"
          @toggle="editTask({ ...task, completed: !task.completed })"
        />
        <button
          class="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-gray-600 dark:text-gray-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
          @click="openForm()"
        >
          <svg
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Task
        </button>
      </template>
    </div>

    <TaskForm
      v-if="showTaskForm"
      :open="showTaskForm"
      :task="selectedTask"
      @close="showTaskForm = false"
      @submit="onTaskSubmit"
      @delete="onDeleteTask"
    />
  </div>
</template>
