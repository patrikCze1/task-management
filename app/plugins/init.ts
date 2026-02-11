export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return;

  const projectStore = useProjectStore();

  projectStore.init();
});
