# My Brain Dumps

Welcome to My Brain Dumps, a personal blog where I share my thoughts, experiences, and insights on various topics, including software engineering, photography, and life in general. This project is a space for me to express myself, reflect on my journey, and hopefully, provide value to others.

## Technologies Used

This project is built using Astro, a modern web framework for building fast, scalable, and secure websites.

## Goals

The primary goal of this project is to create a space where I can share my thoughts, ideas, and experiences with others. Through this blog, I aim to:

* Document my learning journey in software engineering and related fields
* Share my passion for photography and storytelling
* Reflect on my personal growth and life experiences

## Running the Development Environment

To run the development environment for this project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal or command prompt.
3. Run `pnpm install` to install all the project dependencies.
4. Start the development server by running `pnpm run dev`.
5. Open your web browser and navigate to `http://localhost:4321` to view the project.

Note: Make sure you have Node.js and npm installed on your machine.

## Running the Production Environment Locally

To run the production environment for this project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal or command prompt.
3. Run `pnpm install` to install all the project dependencies.
4. Build the project by running `pnpm run build`.
5. Start the production server by running `pnpm run preview`.
6. Open your web browser and navigate to `http://localhost:4321` to view the project in production mode.

Note: Make sure you have Node.js and npm installed on your machine.

## Adding Blogs

To add a new blog post, follow these steps:

1. Create a new Markdown file in the `src/content/blogs` directory. The file name should be kebab-case e.g. `filename-of-my-new-blog.md`.
2. In the Markdown file, include the following:

```
---
title: "Title of the blog"
description: "Description of the blog"
date: 2024-12-23
image: ./images/file.jpeg
caption: "Caption of the image (optional)"
---
```
3. You can add blog images to `src/content/blogs/images/*` with the actual path to your image file.
4. Write your blog post content below using markdown syntax.
6. Done! 🎉

Note: Make sure to optimize your images for web use before adding them to your blog post.
