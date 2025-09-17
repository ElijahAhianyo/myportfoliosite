
import { SidebarProvider } from "@/components/ui/sidebar";
import ProfileSidebar from "@/components/ProfileSidebar";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/posts";

const Index = () => {
  const posts = getAllPosts();


  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full">
        <ProfileSidebar />
        <main className="flex-1 px-4 pt-24 pb-16 ml-0">
          <section className="max-w-3xl mx-auto space-y-16">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-blog-900 animate-fade-up">
                Welcome to My Blog
              </h1>
              <p className="text-xl text-blog-600 animate-fade-up" style={{ animationDelay: "100ms" }}>
                Exploring design, development, and creative thoughts.
              </p>
            </div>
            
            <div className="space-y-12">
              {posts && posts.length > 0 ? (
                posts.map((post, index) => (
                  <div 
                    key={post.slug}
                    className="animate-fade-up"
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    <BlogCard {...post} />
                  </div>
                ))
              ) : (
                <p>No posts found</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
