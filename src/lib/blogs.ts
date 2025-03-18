import { z } from "astro:content";
import matter from "gray-matter";
import dayjs from "dayjs";
import {
  listStorageContents,
  getObjectFromStorage,
  getObjectSignedURLFromStorage,
} from "@utils/storage";

// TODO: would be good to implement this as an Astro Content Loader

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().transform(async (image) => {
    // FIXME: create a resource route for getting image from storage. Do not like this
    try {
      const url = await getObjectSignedURLFromStorage(
        `blogs/${image.replace("./", "")}`
      );
      return url;
    } catch (error) {
      console.log("error: getting image signed url from storage", error);
      return "";
    }
  }),
  caption: z.string().nullish(),
  date: z.coerce.date(),
});

export type BlogPost = z.infer<typeof blogSchema> & {
  slug: string;
  content: string;
};

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = await listStorageContents("blogs/");

  const promises = files
    .filter((file) => file.Key?.endsWith(".md"))
    .map(async (file) => {
      const key = file.Key as string;
      const body = await getObjectFromStorage(key);
      const content = (await body?.transformToString()) || "";
      const { data, content: markdownContent } = matter(content);

      const slug = key.split("/").pop()?.replace(".md", "") || "";

      // validate frontmatter against schema
      const validatedData = await blogSchema.parseAsync(data);

      return {
        ...validatedData,
        slug,
        content: markdownContent,
      };
    });

  const blogPosts = await Promise.all(promises);

  // sort by date descending (most recent first)
  return blogPosts.sort((a: BlogPost, b: BlogPost) =>
    dayjs(b.date).diff(dayjs(a.date))
  );
}
