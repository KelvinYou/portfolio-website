import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Project } from "@/types/project";

const dataFolderPath = path.resolve("src/data");
const projectsFilePath = path.join(dataFolderPath, "projects.json");

export const GET = async (request: NextRequest) => {
  // Get the pathname from the request
  const pathname = request.nextUrl.pathname;
  // Extract the last segment of the pathname as the project ID
  const segments = pathname.split("/");
  const projectId = segments[segments.length - 1];

  try {
    // Check if the projects.json file exists
    await ensureFileExists(projectsFilePath, "[]");

    // Read the projects from the JSON file
    const existingProjects = await fs.readFile(projectsFilePath, "utf-8");
    const projects: Project[] = JSON.parse(existingProjects);

    // Find the project with the specified ID
    const project = projects.find((p) => p.id === projectId);

    // If the project with the specified ID is not found, return a 404 Not Found response
    if (!project) {
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

    // Return a success response with the project data
    return new NextResponse(
      JSON.stringify({ success: true, project }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error retrieving project:", error);

    // Return an error response
    return new NextResponse(
      JSON.stringify({ success: false, error: "Failed to retrieve project" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};


// Helper function to ensure a file exists and has a default content
async function ensureFileExists(filePath: string, defaultContent: string): Promise<void> {
  try {
    await fs.access(filePath);
  } catch (error) {
    // If the file doesn't exist, create it with default content
    await fs.writeFile(filePath, defaultContent, "utf-8");
  }
}