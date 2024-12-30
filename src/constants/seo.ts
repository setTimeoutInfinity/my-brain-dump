import MyAvatar from "@assets/my-avatar.jpeg";

export const personSchema = {
  "@type": "Person",
  name: "Danyal Lakzian",
  description:
    "Hey, I'm Danyal. I'm a Full Stack Software Engineer located in Melbourne trying to solve even the smallest problems.",
  url: "https://lakzian.com",
  sameAs: "https://linkedin.lakzian.com",
  jobTitle: "Software Engineer",
  image: {
    "@type": "ImageObject",
    url: MyAvatar.src,
    caption: "Danyal lakzian",
  },
};
