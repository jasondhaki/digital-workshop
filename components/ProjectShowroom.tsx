"use client";

import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

/**
 * ProjectShowroom: The main grid container for project case studies.
 * FIX: Now passes the 'index' to ProjectCard for optimized image loading.
 */
export default function ProjectShowroom() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {projects.map((project, index) => ( // 1. Catch the index here
        <ProjectCard 
          key={project.id} 
          project={project} 
          index={index} // 2. Pass the index here
        />
      ))}
    </div>
  );
}