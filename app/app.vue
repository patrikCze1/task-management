<script lang="ts" setup>
const sidebarOpen = ref(false);

const isDark = ref(false);

useHead({
  script: [
    {
      innerHTML: `(function(){var t=localStorage.getItem("theme");var d=t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches);if(d)document.documentElement.classList.add("dark")})()`,
      tagPosition: "head",
    },
  ],
});

onMounted(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

function toggleTheme() {
  isDark.value = !isDark.value;
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
  document.documentElement.classList.toggle("dark", isDark.value);
}
</script>

<template>
  <div
    class="flex h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
  >
    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-20 bg-black/50 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 dark:border-gray-700 dark:bg-gray-800 lg:static lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Logo -->
      <div
        class="flex h-16 items-center gap-2 border-b border-gray-200 px-6 dark:border-gray-700"
      >
        <div
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white"
        >
          T
        </div>
        <span class="text-lg font-semibold tracking-tight">Taskly</span>
      </div>

      <!-- Navigation -->
      <div class="flex-1 px-3 py-4">
        <TheMenu @navigate="sidebarOpen = false" />
      </div>
    </aside>

    <!-- Main content area -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Top bar -->
      <header
        class="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800 sm:px-8"
      >
        <!-- Mobile menu button -->
        <button
          class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 lg:hidden"
          @click="sidebarOpen = true"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div class="flex-1" />

        <!-- Dark mode toggle -->
        <button
          class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          @click="toggleTheme"
        >
          <!-- Sun icon (shown in dark mode) -->
          <svg
            v-if="isDark"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 7.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <!-- Moon icon (shown in light mode) -->
          <svg
            v-else
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
            />
          </svg>
        </button>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-4 sm:p-8">
        <NuxtPage />
      </main>

      <!-- Footer -->
      <footer
        class="shrink-0 border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800 sm:px-8"
      >
        <p class="text-xs text-gray-400 dark:text-gray-500">
          &copy; 2026 Taskly. All rights reserved.
        </p>
      </footer>
    </div>
  </div>
</template>
