<script lang="ts" setup>
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

useHead({
  script: [
    {
      innerHTML: `(function(){var t=localStorage.getItem("theme");var d=t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches);if(d)document.documentElement.classList.add("dark")})()`,
      tagPosition: "head",
    },
  ],
});

const statusCode = computed(() => props.error?.status ?? 500);
const message = computed(() => {
  if (statusCode.value === 404)
    return "The page you're looking for doesn't exist.";
  return "Something went wrong. Please try again later.";
});
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900"
  >
    <div class="text-center">
      <p class="text-6xl font-bold text-blue-600 dark:text-blue-400">
        {{ statusCode }}
      </p>
      <h1 class="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {{ error?.statusText || "An error occurred" }}
      </h1>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {{ message }}
      </p>
      <NuxtLink
        to="/"
        class="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Go back home
      </NuxtLink>
    </div>
  </div>
</template>
