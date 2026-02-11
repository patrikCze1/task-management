<script lang="ts" setup>
import type { Task, TaskFormData } from "~~/shared/types/task";

const { task, open } = defineProps<{
  open: boolean;
  task?: Task;
}>();

const emit = defineEmits<{
  close: [];
  submit: [data: TaskFormData];
  delete: [uuid: string];
}>();

const form = ref<TaskFormData>({
  title: task?.title ?? "",
  description: task?.description ?? "",
  dueDate: task?.dueDate ?? "",
  priority: task?.priority ?? "medium",
  completed: task?.completed ?? false,
});

const isEditing = computed(() => !!task);
const formIsValid = computed(() => true);

// watch(
//   () => props.open,
//   (isOpen) => {
//     if (!isOpen) return;
//     title.value = props.task?.title ?? "";
//     description.value = props.task?.description ?? "";
//     dueDate.value = props.task?.dueDate ?? "";
//     priority.value = props.task?.priority ?? "medium";
//   },
// );

function onSubmit() {
  emit("submit", form.value);
  emit("close");
}

function deleteTask() {
  emit("delete", task!.uuid);
  emit("close");
}

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400";
</script>

<template>
  <BaseModal
    :open="open"
    :title="isEditing ? 'Edit Task' : 'New Task'"
    @close="emit('close')"
  >
    <form id="task-form" class="space-y-4" @submit.prevent="onSubmit">
      <InputText
        id="title"
        v-model="form.title"
        placeholder="What needs to be done?"
        label="Title"
      />

      <InputText
        id="description"
        v-model="form.description"
        placeholder="Add more details..."
        label="Description"
        type="textarea"
        rows="3"
      />

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label
            for="task-due-date"
            class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Due date
          </label>
          <input
            id="task-due-date"
            v-model="form.dueDate"
            type="date"
            :class="inputClass"
          />
        </div>

        <div>
          <label
            for="task-priority"
            class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Priority
          </label>
          <select
            id="task-priority"
            v-model="form.priority"
            :class="inputClass"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </form>

    <template #footer>
      <button
        v-if="isEditing"
        type="button"
        class="mr-auto rounded-lg px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        @click="deleteTask"
      >
        Delete
      </button>

      <button
        type="button"
        class="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        @click="emit('close')"
      >
        Cancel
      </button>
      <button
        type="submit"
        form="task-form"
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        :disabled="!formIsValid"
      >
        {{ isEditing ? "Save" : "Create" }}
      </button>
    </template>
  </BaseModal>
</template>
