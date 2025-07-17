import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/posts";

const Blogs = () => {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Blog Posts
            </h1>
            <p className="text-xl text-muted-foreground">
              Thoughts on technology, development, and everything in between.
            </p>
          </div>
          
          <div className="space-y-12">
            {posts && posts.length > 0 ? (
              posts.map((post, index) => (
                <div 
                  key={post.slug}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <BlogCard {...post} />
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No posts found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;