<script lang="ts" setup>
import { flattenError } from "zod";
import type { Task, TaskFormData } from "~~/shared/types/task";
import { TaskPriorityEnum } from "~~/shared/enums/task";

const INITIAL_ERRORS = {
  title: [],
  description: [],
  dueDate: [],
  priority: [],
};

const { task, open } = defineProps<{
  open: boolean;
  task?: Task;
}>();

const emit = defineEmits<{
  close: [];
  submit: [data: TaskFormData];
  delete: [uuid: string];
}>();

const { validateTaskCreate, validateTaskUpdate } = useTaskValidation();

const form = ref<TaskFormData>({
  title: task?.title ?? "",
  description: task?.description ?? "",
  dueDate: task?.dueDate
    ? new Date(task.dueDate).toISOString().split("T")[0]!
    : "",
  priority: task?.priority ?? TaskPriorityEnum.Medium,
  completed: task?.completed ?? false,
});
const formErrors = ref<{ [key: string]: string[] }>(INITIAL_ERRORS);

const isEditing = computed(() => !!task);
const formIsValid = computed(() => true);

function onSubmit() {
  formErrors.value = INITIAL_ERRORS;

  const formData = {
    ...form.value,
    dueDate: form.value?.dueDate && new Date(form.value.dueDate).toISOString(),
  };

  const validationResult = isEditing.value
    ? validateTaskUpdate(formData)
    : validateTaskCreate(formData);

  if (!validationResult.success) {
    const formattedErrors = flattenError(validationResult.error);
    formErrors.value = formattedErrors.fieldErrors;
    return;
  }

  emit("submit", formData);
  emit("close");
}

function deleteTask() {
  emit("delete", task!.uuid);
  emit("close");
}

const baseClass =
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500";
const normalClass =
  "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400";
const errorClass =
  "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500";

function fieldClass(field: string) {
  return [
    baseClass,
    formErrors.value[field]?.length ? errorClass : normalClass,
  ];
}
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
        :errors="formErrors.title"
      />

      <InputText
        id="description"
        v-model="form.description"
        placeholder="Add more details..."
        label="Description"
        type="textarea"
        rows="3"
        :errors="formErrors.description"
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
            :class="fieldClass('dueDate')"
          />
          <p
            v-for="error in formErrors.dueDate"
            :key="error"
            class="mt-1 text-xs text-red-500 dark:text-red-400"
          >
            {{ error }}
          </p>
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
            :class="fieldClass('priority')"
          >
            <option :value="TaskPriorityEnum.Low">Low</option>
            <option :value="TaskPriorityEnum.Medium">Medium</option>
            <option :value="TaskPriorityEnum.High">High</option>
          </select>
          <p
            v-for="error in formErrors.priority"
            :key="error"
            class="mt-1 text-xs text-red-500 dark:text-red-400"
          >
            {{ error }}
          </p>
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
