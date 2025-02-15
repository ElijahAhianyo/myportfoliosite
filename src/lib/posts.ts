
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
  console.log("Found posts files:", Object.keys(posts)); // Added debug log
  
  const processedPosts = Object.entries(posts)
    .map(([filepath, content]) => {
      try {
        const { attributes } = frontMatter<PostAttributes>(content as string);
        return {
          title: attributes.title,
          excerpt: attributes.excerpt,
          date: attributes.date,
          readingTime: attributes.readingTime,
          slug: attributes.slug,
          featured: attributes.featured || false,
        };
      } catch (error) {
        console.error(`Error processing post ${filepath}:`, error);
        return null;
      }
    })
    .filter((post): post is PostMetadata => post !== null)
    .sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime());

  console.log("Processed posts:", processedPosts); // Added debug log
  return processedPosts;
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
