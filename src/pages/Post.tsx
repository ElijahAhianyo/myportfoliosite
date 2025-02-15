
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "@/lib/posts";
import { marked } from "marked";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProfileSidebar from "@/components/ProfileSidebar";

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
          <article className="max-w-3xl mx-auto prose prose-blog">
            <header className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-blog-900">
                {post?.metadata.title}
              </h1>
              <div className="flex items-center gap-2 mt-4 text-sm text-blog-500">
                <time>{post?.metadata.date}</time>
                <span>•</span>
                <span>{post?.metadata.readingTime}</span>
              </div>
            </header>
            <div 
              dangerouslySetInnerHTML={{ __html: marked(post?.content || '') }}
              className="prose prose-blog max-w-none"
            />
          </article>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Post;
