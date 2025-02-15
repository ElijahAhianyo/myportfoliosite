
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "@/lib/posts";
import { marked } from "marked";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProfileSidebar from "@/components/ProfileSidebar";

// Configure marked with code highlighting
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  langPrefix: 'language-',
});

const Post = () => {
  const { slug } = useParams();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug as string),
  });

  if (isLoading) {
    return (
      <SidebarProvider defaultOpen={false}>
        <div className="min-h-screen flex w-full">
          <ProfileSidebar />
          <main className="flex-1 px-4 pt-24 pb-16 ml-0">
            <div className="max-w-3xl mx-auto">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-blog-100 rounded w-3/4"></div>
                <div className="h-4 bg-blog-100 rounded w-1/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-blog-100 rounded"></div>
                  <div className="h-4 bg-blog-100 rounded"></div>
                  <div className="h-4 bg-blog-100 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  if (error) {
    return (
      <SidebarProvider defaultOpen={false}>
        <div className="min-h-screen flex w-full">
          <ProfileSidebar />
          <main className="flex-1 px-4 pt-24 pb-16 ml-0">
            <div className="max-w-3xl mx-auto">
              <p className="text-red-500">Error loading post</p>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full">
        <ProfileSidebar />
        <main className="flex-1 px-4 pt-24 pb-16 ml-0">
          <article className="max-w-3xl mx-auto">
            <header className="mb-12 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-blog-900 mb-4">
                {post?.metadata.title}
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm text-blog-500">
                <time>{post?.metadata.date}</time>
                <span>•</span>
                <span>{post?.metadata.readingTime}</span>
              </div>
            </header>
            <div 
              dangerouslySetInnerHTML={{ __html: marked(post?.content || '') }}
              className="prose prose-lg prose-blog max-w-none
                prose-headings:font-semibold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:text-blog-700 prose-p:leading-relaxed
                prose-a:text-blog-900 prose-a:underline hover:prose-a:text-blog-700
                prose-blockquote:border-l-4 prose-blockquote:border-blog-200 prose-blockquote:pl-4 prose-blockquote:italic
                prose-ul:list-disc prose-ul:pl-6
                prose-ol:list-decimal prose-ol:pl-6
                prose-li:mt-2
                prose-code:px-1.5 prose-code:py-0.5 prose-code:bg-blog-100 prose-code:rounded prose-code:text-blog-800
                prose-pre:bg-blog-900 prose-pre:text-blog-50 prose-pre:p-4 prose-pre:rounded-lg
                prose-pre:overflow-x-auto
                prose-img:rounded-lg prose-img:shadow-md
                [&_pre_code]:bg-transparent [&_pre_code]:p-0
                [&_figure]:my-8
                [&_figure_img]:my-0
                [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-blog-500 [&_figcaption]:mt-2"
            />
          </article>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Post;
