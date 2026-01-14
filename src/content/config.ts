import { defineCollection, z } from 'astro:content';

const projectSchema = z.object({
    title: z.string(),
    category: z.string(),
    imageUrl: z.string(),
    tags: z.array(z.string()),
    description: z.string().optional(),
});

const rigSchema = z.object({
    name: z.string(),
    thumbnail: z.string(),
    description: z.string(),
    software: z.string(),
    price: z.string(),
    downloadUrl: z.string(),
    features: z.array(z.string()),
});

export const collections = {
    portfolio: defineCollection({ type: 'content', schema: projectSchema }),
    projects: defineCollection({ type: 'content', schema: projectSchema }),
    ocs: defineCollection({ type: 'content', schema: projectSchema }),
    photos: defineCollection({ type: 'content', schema: projectSchema }),
    rigs: defineCollection({ type: 'content', schema: rigSchema }),
};
