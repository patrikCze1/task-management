<script lang="ts" setup>
import useProject from "~/composables/useProjectCrud";

const projectStore = useProjectStore();
const { createProject } = useProject();

defineEmits<{
  navigate: [];
}>();

const menuItems = computed(() => {
  return [
    { to: "/", label: "Dashboard" },
    ...projectStore.projects.map((p) => ({
      to: `/projects/${p.id}`,
      label: p.name,
    })),
  ];
});

const showProjectForm = ref(false);

function openProjectForm() {
  showProjectForm.value = true;
}

function onProjectSubmit(data: { name: string; image: string }) {
  createProject(data);
}
</script>

<template>
  <nav class="space-y-6">
    <div>
      <ul class="space-y-1">
        <li v-for="item in menuItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            active-class="!bg-blue-50 !text-blue-700 dark:!bg-blue-900/30 dark:!text-blue-400"
            @click="$emit('navigate')"
          >
            <slot name="item-icon" :item="item" />
            {{ item.label }}
          </NuxtLink>
        </li>
        <li>
          <button
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            @click="openProjectForm"
          >
            Create
          </button>
        </li>
      </ul>
    </div>
  </nav>

  <ProjectForm
    :open="showProjectForm"
    @close="showProjectForm = false"
    @submit="onProjectSubmit"
  />
</template>
