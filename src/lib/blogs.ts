import { z } from "astro:content";
import matter from "gray-matter";
import dayjs from "dayjs";
import { listStorageContents, getObjectFromStorage } from "@utils/storage";

// TODO: would be good to implement this as an Astro Content Loader

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z
    .string()
    .transform(
      (image) =>
        `https://mw-storage.fly.storage.tigris.dev/blogs/${image.replace(
          "./",
          ""
        )}`
    ),
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
      const validatedData = await blogSchema.parse(data);

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
