<script lang="ts" setup>
const route = useRoute();

const { getProject } = useProjectStore();

useHead({
  title: "Project #" + route.params.id,
});

const project = getProject(route.params.id as string);
</script>

<template>
  <div v-if="!project">Not found</div>
  <TaskHandler v-else :project />
</template>
