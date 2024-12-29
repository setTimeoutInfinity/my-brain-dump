import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      caption: z.string().nullish(),
      date: z.coerce.date(),
    }),
});

const albumCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image(),
    }),
});

// This key should match your collection directory name in "src/content"
export const collections = {
  blogs: blogCollection,
  albums: albumCollection,
};
