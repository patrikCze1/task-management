<template>
  <div class="mb-4 flex animate-pulse flex-wrap items-center gap-4">
    <div class="flex items-center gap-1.5">
      <div class="mr-1 h-3 w-10 rounded bg-gray-300 dark:bg-gray-600" />
      <div
        v-for="i in 3"
        :key="i"
        class="h-6 w-16 rounded-full bg-gray-300 dark:bg-gray-600"
      />
    </div>

    <div class="flex items-center gap-1.5">
      <div class="mr-1 h-3 w-12 rounded bg-gray-300 dark:bg-gray-600" />
      <div
        v-for="i in 4"
        :key="i"
        class="h-6 w-16 rounded-full bg-gray-300 dark:bg-gray-600"
      />
    </div>

    <div class="flex items-center gap-1.5">
      <div class="mr-1 h-3 w-7 rounded bg-gray-300 dark:bg-gray-600" />
      <div
        v-for="i in 2"
        :key="i"
        class="h-6 w-16 rounded-full bg-gray-300 dark:bg-gray-600"
      />
    </div>
  </div>
</template>
