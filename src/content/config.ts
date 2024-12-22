import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image(),
      date: z.coerce.date(),
    }),
});

// This key should match your collection directory name in "src/content"
export const collections = {
  blogs: blogCollection,
};
