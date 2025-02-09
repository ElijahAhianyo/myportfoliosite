
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold tracking-tight hover:text-blog-600 transition-colors"
        >
          Portfolio
        </Link>
        <nav className="flex gap-6">
          <Link 
            to="/" 
            className="text-blog-600 hover:text-blog-800 transition-colors"
          >
            Blog
          </Link>
          <Link 
            to="/about" 
            className="text-blog-600 hover:text-blog-800 transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
