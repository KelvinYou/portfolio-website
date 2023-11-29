import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Project } from "@/types/project";

const dataFolderPath = path.resolve("src/data");
const projectsFilePath = path.join(dataFolderPath, "projects.json");

export const GET = async (_request: NextRequest) => {
  try {
    // Check if the projects.json file exists
    await ensureFileExists(projectsFilePath, "[]");

    // Read the projects from the JSON file
    const existingProjects = await fs.readFile(projectsFilePath, "utf-8");
    const projects: Project[] = JSON.parse(existingProjects);

    // Return a success response with the projects data
    return new NextResponse(
      JSON.stringify({ success: true, projects }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error retrieving projects:", error);

    // Return an error response
    return new NextResponse(
      JSON.stringify({ success: false, error: "Failed to retrieve projects" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    // Check if the data folder exists, and create it if it doesn't
    await ensureDirectoryExists(dataFolderPath);

    // Check if projects.json file exists, and create it with an empty array if it doesn't
    await ensureFileExists(projectsFilePath, "[]");

    // Parse the incoming JSON data from the request body
    const newProject: Project = await request.json();

    // Check for mandatory fields
    const mandatoryFields = ["name", "description", "date"];
    const missingFields = mandatoryFields.filter(field => !(field in newProject));

    if (missingFields.length > 0) {
      return new NextResponse(
        JSON.stringify({ success: false, error: `Missing mandatory fields: ${missingFields.join(', ')}` }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Remove unnecessary fields
    const validKeys: Array<keyof Project> = Object.keys(newProject) as Array<keyof Project>;
    const sanitizedProject: any = Object.fromEntries(validKeys.map(key => [key, newProject[key]]));

    // Read the existing projects from the JSON file
    const existingProjects = await fs.readFile(projectsFilePath, "utf-8");
    const projects: Project[] = JSON.parse(existingProjects);

    // Generate a new project ID (you might want to use a more robust method)
    const projectId = Date.now().toString();
    // Get the current date in ISO format
    const currentDate = new Date().toISOString();

    // Create the new project object
    const projectToAdd: Project = {
      id: projectId,
      createDate: currentDate,
      modifyDate: currentDate,
      ...sanitizedProject,
    };

    // Add the new project to the existing projects
    projects.push(projectToAdd);

    // Write the updated projects back to the JSON file
    await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2), "utf-8");

    // Return a success response with the new project data
    return new NextResponse(
      JSON.stringify({ success: true, project: projectToAdd }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error adding a new project:", error);

    // Return an error response
    return new NextResponse(
      JSON.stringify({ success: false, error: "Failed to add a new project" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const PATCH = async (request: NextRequest) => {
  try {
    // Check if the projects.json file exists
    await ensureFileExists(projectsFilePath, "[]");

    // Read the projects from the JSON file
    const existingProjects = await fs.readFile(projectsFilePath, "utf-8");
    const projects: Project[] = JSON.parse(existingProjects);

    // Get the project ID and new data from the request body
    const { id, newData } = await request.json();

    // Find the index of the project with the specified ID
    const projectIndex = projects.findIndex(project => project._id === id);

    // If the project with the specified ID is not found, return a 404 Not Found response
    if (projectIndex === -1) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Project not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Update the project with the new values
    projects[projectIndex] = { 
      ...projects[projectIndex], 
      ...newData,      
      modifyDate: new Date().toISOString(),
    };

    // Write the updated projects back to the JSON file
    await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2), "utf-8");

    // Return a success response with the updated project data
    return new NextResponse(
      JSON.stringify({ success: true, project: projects[projectIndex] }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error editing project:", error);

    // Return an error response
    return new NextResponse(
      JSON.stringify({ success: false, error: "Failed to edit project" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

// Helper function to ensure a directory exists
async function ensureDirectoryExists(directoryPath: string): Promise<void> {
  await fs.mkdir(directoryPath, { recursive: true });
}

// Helper function to ensure a file exists and has a default content
async function ensureFileExists(filePath: string, defaultContent: string): Promise<void> {
  try {
    await fs.access(filePath);
  } catch (error) {
    // If the file doesn't exist, create it with default content
    await fs.writeFile(filePath, defaultContent, "utf-8");
  }
}
