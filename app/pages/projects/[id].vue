<script lang="ts" setup>
const route = useRoute();

const { getProject, initiliazed } = useProjectStore();

useHead({
  title: "Project #" + route.params.id,
});

const project = getProject(route.params.id as string);
</script>

<template>
  <TaskHandlerSkeleton v-if="!initiliazed" key="skeleton" />
  <ProjectNotFound v-else-if="!project" key="notFound" />
  <TaskHandler v-else :project key="handler" />
</template>
