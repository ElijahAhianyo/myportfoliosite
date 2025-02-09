
import { SidebarProvider } from "@/components/ui/sidebar";
import ProfileSidebar from "@/components/ProfileSidebar";
import BlogCard from "@/components/BlogCard";

// Mock data - replace with real data later
const posts = [
  {
    title: "Creating Minimalist Designs That Stand Out",
    excerpt: "Learn how to create impactful minimalist designs that capture attention while maintaining simplicity and elegance...",
    date: "March 14, 2024",
    readingTime: "5 min read",
    slug: "minimalist-designs",
    featured: true,
  },
  {
    title: "The Art of Typography in Web Design",
    excerpt: "Exploring how typography choices can make or break your web design, with practical tips for choosing and pairing fonts...",
    date: "March 12, 2024",
    readingTime: "4 min read",
    slug: "typography-in-web-design",
  },
  {
    title: "Color Theory Basics for Designers",
    excerpt: "Understanding color theory is crucial for creating harmonious designs. Let's explore the fundamentals...",
    date: "March 10, 2024",
    readingTime: "6 min read",
    slug: "color-theory-basics",
  },
];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ProfileSidebar />
        <main className="flex-1 px-4 pt-24 pb-16">
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
              {posts.map((post, index) => (
                <div 
                  key={post.slug}
                  className="animate-fade-up"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <BlogCard {...post} />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
