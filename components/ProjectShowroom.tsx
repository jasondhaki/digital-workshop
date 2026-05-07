"use client";

import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

/**
 * ProjectShowroom: The main grid container for project case studies.
 * It organizes your portfolio into a high-end gallery layout.
 */
export default function ProjectShowroom() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}