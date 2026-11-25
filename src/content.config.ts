import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, ''),
  }),
  schema: z.object({
    locale: z.enum(['nl', 'en']),
    slug: z.string(),
    translationSlug: z.string(),
    title: z.string(),
    subtitle: z.string(),
    category: z.string(),
    status: z.string(),
    order: z.number(),
    summary: z.string(),
    stack: z.array(z.string()),
    visualKind: z.enum(['weavers', 'cvTarget', 'iot', 'pcb', 'cloud']),
    featuredOnHome: z.boolean().default(false),
    githubUrl: z.url().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, ''),
  }),
  schema: z.object({
    locale: z.enum(['nl', 'en']),
    slug: z.string(),
    translationSlug: z.string(),
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    readingMinutes: z.number(),
  }),
});

export const collections = { projects, blog };
