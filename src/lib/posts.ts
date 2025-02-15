
import matter from 'gray-matter';

interface PostMetadata {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  slug: string;
  featured?: boolean;
}

export function getAllPosts(): PostMetadata[] {
  const posts = import.meta.glob('../posts/*.md', { eager: true, as: 'raw' });
  
  return Object.entries(posts)
    .map(([filepath, content]) => {
      const { data } = matter(content as string);
      return {
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        readingTime: data.readingTime,
        slug: data.slug,
        featured: data.featured || false,
      };
    })
    .sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime());
}

export async function getPostBySlug(slug: string) {
  const posts = import.meta.glob('../posts/*.md', { eager: true, as: 'raw' });
  const postContent = Object.entries(posts).find(([filepath]) => 
    filepath.includes(slug)
  )?.[1];

  if (!postContent) {
    throw new Error(`Post with slug ${slug} not found`);
  }

  const { data, content } = matter(postContent as string);
  return {
    metadata: {
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      readingTime: data.readingTime,
      slug: data.slug,
      featured: data.featured || false,
    },
    content
  };
}
