export interface Project {
  id: string;
  name: string;
}

export type ProjectForm = Pick<Project, "name">;
