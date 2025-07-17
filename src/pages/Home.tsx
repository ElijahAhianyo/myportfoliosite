import { Link } from "react-router-dom";
import { getAllPosts } from "@/lib/posts";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const posts = getAllPosts().slice(0, 3); // Show only first 3 posts

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Biography Section */}
        <section className="space-y-8">
          <div className="space-y-6">
            <blockquote className="text-xl italic text-muted-foreground border-l-4 border-primary pl-6">
              "Any sufficiently advanced technology is indistinguishable from magic."
              <footer className="text-sm mt-2 not-italic">— Arthur C. Clarke</footer>
            </blockquote>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Hey, I'm Elijah Ahianyo
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate software engineer from Ghana who loves crafting elegant solutions to complex problems. 
                My journey in tech spans across backend development, system architecture, and everything 
                in between. When I'm not coding, you'll find me exploring the latest technologies, 
                contributing to open source, or sharing knowledge through writing.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <a href="mailto:elijahahianyo@gmail.com" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/ElijahAhianyo" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://linkedin.com/in/elijah-ahianyo" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </Button>
          </div>
        </section>

        {/* Recent Blog Posts */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Posts</h2>
            <Button variant="outline" asChild>
              <Link to="/blogs">View All Posts</Link>
            </Button>
          </div>
          
          <div className="grid gap-6">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group p-6 rounded-lg border hover:border-primary/50 transition-colors"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <time dateTime={post.date}>{post.date}</time>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;