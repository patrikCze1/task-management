<script lang="ts" setup>
const baseClass =
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500";
const normalClass =
  "border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400";
const errorClass =
  "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500";

const model = defineModel<string>({ required: true });
const { type = "text", errors } = defineProps<{
  id: string;
  label: string;
  type?: "text" | "textarea";
  errors?: string[];
}>();

const hasErrors = computed(() => errors && errors.length > 0);
const inputClass = computed(() => [
  baseClass,
  hasErrors.value ? errorClass : normalClass,
]);
</script>

<template>
  <div>
    <label
      :for="id"
      class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
    </label>
    <input
      v-if="type === 'text'"
      :id
      v-model="model"
      type="text"
      :class="inputClass"
      v-bind="$attrs"
    />
    <textarea v-else :id v-model="model" :class="inputClass" v-bind="$attrs" />
    <p
      v-for="error in errors"
      :key="error"
      class="mt-1 text-xs text-red-500 dark:text-red-400"
    >
      {{ error }}
    </p>
  </div>
</template>
