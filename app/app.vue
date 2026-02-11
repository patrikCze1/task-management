<script lang="ts" setup>
const navLinks = [
  { to: "/", label: "Dashboard", icon: "layout-dashboard" },
  { to: "/projects", label: "Projects", icon: "folder" },
];
</script>

<template>
  <div class="flex h-screen bg-gray-50 text-gray-900">
    <!-- Sidebar -->
    <aside class="flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      <!-- Logo -->
      <div class="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
          T
        </div>
        <span class="text-lg font-semibold tracking-tight">Taskly</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-1 px-3 py-4">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          active-class="!bg-blue-50 !text-blue-700"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Sidebar footer -->
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
            PM
          </div>
          <div class="text-sm">
            <p class="font-medium text-gray-900">Project Manager</p>
            <p class="text-xs text-gray-500">pm@taskly.app</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main content area -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Top bar -->
      <header class="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8">
        <h1 class="text-lg font-semibold">
          <slot name="header" />
        </h1>
        <div class="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            class="rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-8">
        <NuxtPage />
      </main>

      <!-- Footer -->
      <footer class="shrink-0 border-t border-gray-200 bg-white px-8 py-3">
        <p class="text-xs text-gray-400">&copy; 2026 Taskly. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>
