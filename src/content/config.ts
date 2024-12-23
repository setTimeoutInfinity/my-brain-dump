import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      imageDimensions: z.tuple([z.coerce.number(), z.coerce.number()]),
      thumbnail: image(),
      cover: image(),
      caption: z.string().nullish(),
      date: z.coerce.date(),
    }),
});

// This key should match your collection directory name in "src/content"
export const collections = {
  blogs: blogCollection,
};
