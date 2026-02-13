<template>
  <div>
    <TaskFiltersSkeleton />

    <div class="grid grid-cols-1 gap-4">
      <TaskCardSkeleton v-for="i in 5" :key="i" />
    </div>
  </div>
</template>
