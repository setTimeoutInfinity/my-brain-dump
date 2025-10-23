import { z, type SchemaContext } from "astro:content";
import matter from "gray-matter";
import dayjs from "dayjs";
import { listStorageContents, getObjectFromStorage } from "@utils/storage";
import { inferRemoteSize } from "astro:assets";

export const imageSchema = ({ image }: SchemaContext) => image();

const albumSchema = z.object({
  title: z.string(),
  description: z.string(),
  cover: z.string().transform((cover) => {
    // Transform local path to S3 URL
    const cleanPath = cover.replace("./", "");
    return `https://mw-storage.fly.storage.tigris.dev/albums/${cleanPath}`;
  }),
  date: z.coerce.date(),
  location: z.string(),
});

export type Album = z.infer<typeof albumSchema> & {
  id: string;
};

export type AlbumImage = {
  src: string;
  width: number;
  height: number;
};

export async function getAllAlbums(): Promise<Album[]> {
  try {
    const files = await listStorageContents("albums/");

    const albumFiles = files.filter((file) => {
      const key = file.Key as string;
      return key.endsWith(".yml") && key.split("/").length === 2;
    });

    const promises = albumFiles.map(async (file) => {
      const key = file.Key as string;
      const body = await getObjectFromStorage(key);
      const content = (await body?.transformToString()) || "";

      const { data } = matter(content);

      const id = key.split("/").pop()?.replace(".yml", "") || "";

      const validatedData = await albumSchema.parse(data);

      return {
        ...validatedData,
        id,
      };
    });

    const albums = await Promise.all(promises);

    return albums.sort((a: Album, b: Album) =>
      dayjs(b.date).diff(dayjs(a.date))
    );
  } catch (error) {
    console.error("Error fetching albums from S3:", error);
    return [];
  }
}

export async function getAlbumImages(albumId: string): Promise<AlbumImage[]> {
  try {
    const prefix = `albums/${albumId}/`;
    const files = await listStorageContents(prefix);

    const imageFiles = files.filter((file) => {
      const key = file.Key as string;
      return /\.(webp|jpg|jpeg|png)$/i.test(key);
    });

    const images = await Promise.all(
      imageFiles.map(async (file) => {
        const key = file.Key as string;
        const url = `https://mw-storage.fly.storage.tigris.dev/${key}`;

        const { height, width } = await inferRemoteSize(url);

        return {
          src: url,
          height,
          width,
        };
      })
    );

    return images.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error(`Error fetching images for album ${albumId}:`, error);
    return [];
  }
}
