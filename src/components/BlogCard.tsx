
import { Link } from "react-router-dom";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  slug: string;
  featured?: boolean;
}

const BlogCard = ({ title, excerpt, date, readingTime, slug, featured }: BlogCardProps) => {
  return (
    <Link 
      to={`/blog/${slug}`}
      className={`
        block group p-6 rounded-lg transition-all duration-300
        ${featured 
          ? 'bg-blog-100 hover:bg-blog-200' 
          : 'hover:bg-blog-50'
        }
      `}
    >
      <article className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-blog-500">
          <time>{date}</time>
          <span>•</span>
          <span>{readingTime}</span>
        </div>
        <h2 className={`
          ${featured ? 'text-2xl' : 'text-xl'}
          font-semibold tracking-tight text-blog-900
          group-hover:text-blog-600 transition-colors
        `}>
          {title}
        </h2>
        <p className="text-blog-600 line-clamp-2">
          {excerpt}
        </p>
      </article>
    </Link>
  );
};

export default BlogCard;
