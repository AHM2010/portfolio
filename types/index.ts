export type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  categories: ProjectFilter[];
  overview: string;
  problem: string;
  solution: string;
  learned: string;
  challenges: string;
  future: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type ProjectFilter = "React" | "Tailwind" | "Frontend";

export type SkillGroup = { title: string; description: string; skills: string[] };
