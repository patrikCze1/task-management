<script lang="ts" setup>
const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
  submit: [data: { name: string }];
}>();

const name = shallowRef("");

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      name.value = "";
    }
  },
);

function onSubmit() {
  emit("submit", { name: name.value });
  emit("close");
}
</script>

<template>
  <BaseModal :open="open" title="New Project" @close="emit('close')">
    <form id="project-form" class="space-y-4" @submit.prevent="onSubmit">
      <InputText
        id="name"
        v-model="name"
        placeholder="My Project"
        label="Name"
        type="text"
      />
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
