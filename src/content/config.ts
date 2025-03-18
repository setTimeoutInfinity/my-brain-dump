import { defineCollection, z } from "astro:content";

const albumCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image(),
      date: z.coerce.date(),
      location: z.string(),
    }),
});

// This key should match your collection directory name in "src/content"
export const collections = {
  albums: albumCollection,
};
