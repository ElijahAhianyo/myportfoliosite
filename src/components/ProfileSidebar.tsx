
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";

const ProfileSidebar = () => {
  return (
    <Sidebar className="w-[240px] border-r">
      <SidebarTrigger className="fixed top-4 left-4 z-50">
        <User className="h-5 w-5" />
      </SidebarTrigger>
      
      <SidebarContent className="pt-16">
        <SidebarHeader className="px-6 py-4">
          <h2 className="text-2xl font-semibold tracking-tight">John Doe</h2>
          <div className="mt-4 mb-3">
            <img
              src="/photo-1485827404703-89b55fcc595e"
              alt="Profile"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
          <p className="text-muted-foreground mt-1 italic">
            Full-stack developer crafting delightful web experiences
          </p>
        </SidebarHeader>

        <div className="px-6 py-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm uppercase text-muted-foreground font-medium">Links</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm uppercase text-muted-foreground font-medium">Navigation</h3>
            <nav className="space-y-2">
              <Link 
                to="/"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <Link 
                to="/projects"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Projects
              </Link>
            </nav>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProfileSidebar;
