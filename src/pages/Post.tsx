
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "@/lib/posts";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";

const Post = () => {
  const { slug } = useParams();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug as string),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 pt-24">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 pt-24">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <p className="text-destructive">Error loading post</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 pt-24">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link 
          to="/blogs" 
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to posts</span>
        </Link>
        
        <article className="space-y-8">
          <header className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              {post?.metadata.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <time>{post?.metadata.date}</time>
              <span>•</span>
              <span>{post?.metadata.readingTime}</span>
            </div>
          </header>
          
          <div className="prose prose-slate dark:prose-invert max-w-none
                         prose-headings:font-bold prose-headings:tracking-tight
                         prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                         prose-p:leading-relaxed prose-p:text-foreground/90
                         prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                         prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-4
                         prose-img:rounded-lg prose-img:shadow-md
                         prose-hr:border-border">
            <ReactMarkdown 
              children={post?.content || ""}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            />
          </div>
        </article>
      </div>
    </div>
  );
};

export default Post;
