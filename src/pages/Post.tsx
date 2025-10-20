
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "@/lib/posts";
import { ArrowLeft } from "lucide-react";
import Markdown from "markdown-to-jsx";
import { Note } from "@/components/Note";
import { MarkdownAccordion } from "@/components/MarkdownAccordion";
import { useTheme } from "@/contexts/ThemeContext";
import { CodeBlock } from "@/components/CodeBlock";

const Post = () => {
  const { slug } = useParams();
  const { theme } = useTheme();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug as string),
  });

  // Using Shiki via CodeBlock; no dynamic CSS injection needed

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

  // Custom components for markdown
  const options = {
    overrides: {
      // Custom Note component support
      div: {
        component: ({ className, children, ...props }: any) => {
          if (className?.includes('note')) {
            const variant = className.includes('warning') ? 'warning' :
                          className.includes('tip') ? 'tip' : 'info';
            const title = className.includes('title=') ?
                         className.match(/title=([^ ]+)/)?.[1] : 'Note';
            return (
              <Note variant={variant} title={title}>
                {children}
              </Note>
            );
          }
          return <div className={className} {...props}>{children}</div>;
        }
      },
      // Custom Accordion component support
      summary: {
        component: ({ children }: any) => {
          // Store summary content in a special wrapper that details can find
          return <span data-accordion-summary="true">{children}</span>;
        }
      },
      details: {
        component: ({ children, ...props }: any) => {
          // Extract title from summary element if present
          const childArray = React.Children.toArray(children);
          let title = props.title || 'Notes';
          let content = childArray;
          
          // Find the summary element (marked with data-accordion-summary)
          const summaryIndex = childArray.findIndex((child: any) => 
            child?.props?.['data-accordion-summary'] === 'true'
          );
          
          if (summaryIndex !== -1) {
            const summaryElement = childArray[summaryIndex] as any;
            // Extract the title from summary's children
            title = summaryElement.props.children;
            // Get remaining content (everything except summary)
            content = childArray.filter((_, index) => index !== summaryIndex);
          }
          
          return (
            <MarkdownAccordion title={title}>
              {content}
            </MarkdownAccordion>
          );
        }
      },
      // Handle tables with better styling
      table: {
        component: ({ children, ...props }: any) => (
          <div className="my-8 overflow-x-auto rounded-lg border border-border shadow-sm">
            <table className="min-w-full divide-y divide-border" {...props}>
              {children}
            </table>
          </div>
        )
      },
      thead: {
        component: ({ children, ...props }: any) => (
          <thead className="bg-muted/70" {...props}>
            {children}
          </thead>
        )
      },
      tbody: {
        component: ({ children, ...props }: any) => (
          <tbody className="divide-y divide-border bg-background" {...props}>
            {children}
          </tbody>
        )
      },
      tr: {
        component: ({ children, ...props }: any) => (
          <tr className="hover:bg-muted/40 transition-colors duration-150" {...props}>
            {children}
          </tr>
        )
      },
      th: {
        component: ({ children, ...props }: any) => (
          <th className="px-6 py-4 text-left text-xs font-semibold text-foreground uppercase tracking-wider border-b-2 border-border" {...props}>
            {children}
          </th>
        )
      },
      td: {
        component: ({ children, ...props }: any) => (
          <td className="px-6 py-4 text-sm text-foreground/90" {...props}>
            {children}
          </td>
        )
      },
      // Code highlighting
      code: {
        component: ({ className, children, ...props }: any) => {
          const langMatch = (className || '').match(/\blang-([A-Za-z0-9_-]+)\b/);
          const match = langMatch ? langMatch[1].toLowerCase() : null;
          return match ? (
            <CodeBlock className={className}>
              {children}
            </CodeBlock>
          ) : (
            <code 
              className="px-1.5 py-0.5 rounded text-sm font-mono gangster" 
              {...props}
            >
              {children}
            </code>
          );
        }
      },
      blockquote: {
  component: ({ children, className }: any) => {
    return (
      <blockquote className={`border-l-1 pl-4 py-2 my-4 bg-muted/50 border-primary rounded-lg ${className || ''}`}>
        {children}
      </blockquote>
    )
  }
}

    }
  };

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
            <Markdown options={options}>
              {post?.content || ""}
            </Markdown>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Post;
