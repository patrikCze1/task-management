<template>
  <div
    key="notFound"
    class="flex flex-col items-center justify-center py-24 text-center"
  >
    <p class="text-5xl font-bold text-gray-300 dark:text-gray-600">404</p>
    <h2 class="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
      Project not found
    </h2>
    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      The project you're looking for doesn't exist or has been removed.
    </p>
    <NuxtLink
      to="/"
      class="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
    >
      Back to dashboard
    </NuxtLink>
  </div>
</template>
