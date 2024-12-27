import sharp from "sharp";
import path from "path";
import fs from "fs";

// Define the type for size object
interface ImageSize {
  suffix: string;
  width: number;
  quality: number;
}

// Define your desired sizes (you can adjust these)
const sizes: ImageSize[] = [
  { suffix: "thumb", width: 640, quality: 40 },
  { suffix: "cover", width: 800, quality: 70 },
  { suffix: "original", width: 1600, quality: 100 },
];

// Function to process the image and save different versions
const optimizeImage = async (inputPath: string): Promise<void> => {
  try {
    // Check if the image exists
    if (!fs.existsSync(inputPath)) {
      console.error(`Image not found: ${inputPath}`);
      return;
    }

    // Extract the file name and extension
    const fileName = path.basename(inputPath, path.extname(inputPath));
    const outputDir = path.dirname(inputPath);

    // Read and process the image using sharp
    for (const size of sizes) {
      const outputPath = path.join(
        "./src/content/blogs/images",
        `${fileName}-${size.suffix}.webp`
      );

      console.log(`Processing "${size.suffix}" version...`);
      const resizeTransformer = sharp().resize({ width: size.width });
      const formatTransformer = sharp().webp({ quality: size.quality });

      await sharp(inputPath)
        .pipe(resizeTransformer)
        .pipe(formatTransformer)
        .toFile(outputPath);

      console.log(`Created: "${outputPath}"`);
    }
  } catch (error) {
    console.error("Error processing image:", error);
  }
};

// Get the image path from command line arguments
const inputImagePath = process.argv[2];

if (!inputImagePath) {
  console.log("Please provide the image path as an argument.");
  process.exit(1);
}

optimizeImage(inputImagePath);
