
interface PostMetadata {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  slug: string;
  featured?: boolean;
}

const posts: PostMetadata[] = [
  {
    title: "Creating Minimalist Designs That Stand Out",
    excerpt: "Learn how to create impactful minimalist designs that capture attention while maintaining simplicity and elegance...",
    date: "2024-03-14",
    readingTime: "5 min read",
    slug: "minimalist-designs",
    featured: true,
  },
  {
    title: "The Art of Typography in Web Design",
    excerpt: "Exploring how typography choices can make or break your web design, with practical tips for choosing and pairing fonts...",
    date: "2024-03-12",
    readingTime: "4 min read",
    slug: "typography-in-web-design",
  },
  {
    title: "Color Theory Basics for Designers",
    excerpt: "Understanding color theory is crucial for creating harmonious designs. Let's explore the fundamentals...",
    date: "2024-03-10",
    readingTime: "6 min read",
    slug: "color-theory-basics",
  },
];

export function getAllPosts(): PostMetadata[] {
  return posts.sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime());
}
