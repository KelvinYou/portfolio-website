import { preview, github } from "@/assets";
import { SpotlightGridType } from "@/components/SpotlightGrid";
import { ProjectType } from "@/types/project";

export const createProjectItem = (project: ProjectType): SpotlightGridType => {
  const { name: title, description: content, _id: projectId, images, date, liveSiteLink, sourceCodeLink, tags } = project;
  const link = `/projects/${projectId}`;
  const image = images?.[0];
  const externalButton = [];

  if (liveSiteLink) {
    externalButton.push({
      imageUrl: preview,
      link: liveSiteLink,
      label: "Live Preview"
    });
  }

  if (sourceCodeLink) {
    externalButton.push({
      imageUrl: github,
      link: sourceCodeLink,
      label: "View Source Code"
    });
  }

  const tagNames = tags?.map(tag => tag.name);

  return {
    title,
    content,
    link,
    image,
    date,
    liveSiteLink,
    sourceCodeLink,
    externalButton,
    tags: tagNames
  };
};