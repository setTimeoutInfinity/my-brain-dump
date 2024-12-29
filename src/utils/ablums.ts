export async function getAlbumImages(albumId: string) {
  let images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/content/albums/**/*.{webp,jpg}"
  );

  images = Object.fromEntries(
    Object.entries(images).filter(([key]) => key.includes(albumId))
  );

  const resolvedImages = await Promise.all(
    Object.values(images).map((image) => image().then((mod) => mod.default))
  );

  return resolvedImages.sort(() => Math.random() - 0.5);
}
