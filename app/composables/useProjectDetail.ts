export default function useProjectDetail(projectId: string) {
  const projectStore = useProjectStore();

  const slectedProject = computed(() => {
    return projectStore.projects.find((p) => p.id === projectId);
  });

  const projectTasks = computed(() => {
    return projectStore.tasks.filter((task) => task.projectId === projectId);
  });

  return {
    slectedProject,
    projectTasks,
  };
}
