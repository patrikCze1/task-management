<script lang="ts" setup>
import type { Task } from "~~/shared/types/task";

const route = useRoute();

const tasks: Task[] = [
  {
    uuid: "123",
    title: "Task 1",
    description: "Description 1",
    dueDate: "2023-01-01",
    priority: "high",
    projectId: 1,
    completed: false,
  },
];
</script>

<template>
  <h1>Project #{{ route.params.id }}</h1>

  <div>
    <TaskCard v-for="task in tasks" :key="task.uuid" :task />
  </div>
</template>

<style></style>
