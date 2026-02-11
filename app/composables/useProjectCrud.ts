import type { ProjectForm } from "~~/shared/types/project";

export default function useProjectCrud() {
  const { addProject } = useProjectStore();

  function createProject(project: ProjectForm) {
    addProject({
      ...project,
      id: new Date().getTime().toString(),
    });
  }

  return {
    createProject,
  };
}
