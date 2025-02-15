
import fs from 'fs';
import path from 'path';
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
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
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

  return posts;
}
