import projects from '@/data/projects.json';
import { Project } from '@/types/project';

// Function to get all projects
export const getProjects = () => {
  return projects;
};

export const getProjectById = (projectId: string) => {
  const projects = getProjects();

  if (!Array.isArray(projects)) {
    console.error('Error: Projects data is not an array.');
    return null;
  }

  const project = projects.find((p) => p._id === projectId);

  if (!project) {
    console.error(`Error: Project with ID ${projectId} not found.`);
    return null;
  }

  return project;
};

export const getProjectsByIds = (projectIds: string[]): Project[] => {
  try {
    const projects = getProjects();

    if (!Array.isArray(projects)) {
      console.error('Error: Projects data is not an array.');
      return [];
    }

    const filteredProjects = projects.filter((project) => projectIds.includes(project._id));

    if (filteredProjects.length !== projectIds.length) {
      console.error('Error: Some projects not found.');
      return [];
    }

    return filteredProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};