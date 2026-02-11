<script lang="ts" setup>
const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400";

const model = defineModel<string>({ required: true });
const { type = "text" } = defineProps<{
  id: string;
  label: string;
  type?: "text" | "textarea";
}>();
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
  </div>
</template>
