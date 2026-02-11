<script lang="ts" setup>
const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
  submit: [data: { name: string; image: string }];
}>();

const name = shallowRef("");
const image = shallowRef("");

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      name.value = "";
      image.value = "";
    }
  },
);

function onSubmit() {
  emit("submit", { name: name.value, image: image.value });
  emit("close");
}
</script>

<template>
  <BaseModal :open="open" title="New Project" @close="emit('close')">
    <form id="project-form" class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <label
          for="project-name"
          class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Name
        </label>
        <input
          id="project-name"
          v-model="name"
          type="text"
          required
          placeholder="My Project"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        />
      </div>
      <div>
        <label
          for="project-image"
          class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Image URL
        </label>
        <input
          id="project-image"
          v-model="image"
          type="url"
          placeholder="https://example.com/image.png"
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        />
      </div>
    </form>

    <template #footer>
      <button
        type="button"
        class="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        @click="emit('close')"
      >
        Cancel
      </button>
      <button
        type="submit"
        form="project-form"
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        :disabled="!name.trim()"
      >
        Create
      </button>
    </template>
  </BaseModal>
</template>
