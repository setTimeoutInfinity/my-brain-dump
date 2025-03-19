# My Brain Dumps

Welcome to My Brain Dumps, a personal blog where I share my thoughts, experiences, and insights on various topics, including software engineering, photography, and life in general. This project is a space for me to express myself, reflect on my journey, and hopefully, provide value to others.

## 🚀 Technologies Used

This project is built using [Astro](https://astro.build/), a modern web framework for building fast, scalable, and secure websites.

## 🎯 Goals

The primary goal of this project is to create a space where I can share my thoughts, ideas, and experiences with others. Through this blog, I aim to:

- 📚 Document my learning journey in software engineering and related fields
- 📷 Share my passion for photography and storytelling
- 🌱 Reflect on my personal growth and life experiences

## 🛠️ Setup and Running

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [pnpm](https://pnpm.io/) (v6 or later)
- [Docker](https://www.docker.com/products/docker-desktop) (optional, for containerized deployment)

### Development Environment

1. Clone the repository and navigate to the project directory.
2. Install dependencies: `pnpm install`.
3. Start the development server: `pnpm run dev`.
4. Open your browser and navigate to `http://localhost:4321`.

### Production Environment (Local)

1. Build the project: `pnpm run build`.
2. Start the production server: `pnpm run preview`.
3. Open your browser and navigate to `http://localhost:4321`.

### Docker Deployment

This project uses Docker BuildKit to securely mount secrets during the build process.

1. Create secret files (replace `<value>` with actual secret values):

```sh
echo "<s3-region>" > AWS_REGION.secret
echo "<s3-bucket-name>" > BUCKET_NAME.secret
echo "<s3-access-key-id>" > AWS_ACCESS_KEY_ID.secret
echo "<s3-endpoint-url>" > AWS_ENDPOINT_URL_S3.secret
echo "<s3-secret-access-key>" > AWS_SECRET_ACCESS_KEY.secret
```

2. Build the Docker image:

```sh
DOCKER_BUILDKIT=1 docker build \
  --secret id=AWS_ENDPOINT_URL_S3,src=./AWS_ENDPOINT_URL_S3.secret \
  --secret id=AWS_REGION,src=./AWS_REGION.secret \
  --secret id=AWS_ACCESS_KEY_ID,src=./AWS_ACCESS_KEY_ID.secret \
  --secret id=AWS_SECRET_ACCESS_KEY,src=./AWS_SECRET_ACCESS_KEY.secret \
  --secret id=BUCKET_NAME,src=./BUCKET_NAME.secret \
  -t my-website .
```

3. Run the Docker container:

```sh
docker run -p 4321:4321 my-website
```

## 📝 Adding Content

### Blog Posts

1. Create a new Markdown file in your S3 bucket `blogs/*` directory with a kebab-case filename (e.g., `my-new-blog-post.md`).
2. Include the following frontmatter:

```yml
---
title: "Title of the blog"
description: "Description of the blog"
date: 2024-12-23
image: ./images/file.jpeg
caption: "Caption of the image (optional)"
---
your blog content goes here...
```

3. Add blog image to `blogs/images/*`.
4. Write your blog post content using Markdown syntax.

### Photo Albums

1. Create a new directory in `src/content/albums` with a kebab-case name (e.g., `my-new-album`).
2. Create a matching `.yml` file in `src/content/albums` (e.g., `my-new-album.yml`).
3. Place album images in the new directory.
4. In the `.yml` file, include:

```yml
title: "Title of the photo album"
description: "Description of the photo album"
cover: "./name-of-my-new-album/image-1.webp"
```

## 📞 Contact

Danyal Lakzian - [@TalOuchy](https://t.me/TalOuchy) - danyal@lakian.com

Project Link: [https://github.com/setTimeoutInfinity/my-brain-dump](https://github.com/setTimeoutInfinity/my-brain-dump)
