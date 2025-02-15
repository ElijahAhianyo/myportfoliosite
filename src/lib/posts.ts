
import frontMatter from 'front-matter';

interface PostMetadata {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  slug: string;
  featured?: boolean;
}

interface PostAttributes {
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
      const { attributes } = frontMatter<PostAttributes>(content as string);
      return {
        title: attributes.title,
        excerpt: attributes.excerpt,
        date: attributes.date,
        readingTime: attributes.readingTime,
        slug: attributes.slug,
        featured: attributes.featured || false,
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

  const { attributes, body } = frontMatter<PostAttributes>(postContent as string);
  return {
    metadata: {
      title: attributes.title,
      excerpt: attributes.excerpt,
      date: attributes.date,
      readingTime: attributes.readingTime,
      slug: attributes.slug,
      featured: attributes.featured || false,
    },
    content: body
  };
}
