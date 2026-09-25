import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    part: z.string(),
    order: z.number(),
    tag: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { blog };
