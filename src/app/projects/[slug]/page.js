import { notFound } from "next/navigation";
import {
  getAdjacentProjects,
  getProjectBySlug,
  getProjectNumber,
  projects,
} from "@/app/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.thumbnail ? [project.thumbnail.src] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(slug);

  return (
    <ProjectDetailClient
      project={project}
      number={getProjectNumber(project.slug)}
      projectCount={projects.length}
      previous={previous}
      next={next}
      previousNumber={previous ? getProjectNumber(previous.slug) : null}
      nextNumber={next ? getProjectNumber(next.slug) : null}
    />
  );
}
