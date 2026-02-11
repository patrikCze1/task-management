export interface Project {
  id: string;
  name: string;
  image: string;
}

export type ProjectForm = Pick<Project, "name" | "image">;
