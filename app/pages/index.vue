<script lang="ts" setup>
const { tasks } = useProjectStore();
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline mb-4">Dashboard</h1>

    <div class="grid grid-cols-1 gap-4">
      <TaskCard v-for="task in tasks" :key="task.uuid" :task="task" />
    </div>
  </div>
</template>
