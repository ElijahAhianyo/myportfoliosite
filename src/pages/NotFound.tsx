
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const NotFound = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-blog-900 animate-fade-up">
            404 - Page Not Found
          </h1>
          <p className="text-xl text-blog-600 animate-fade-up" style={{ animationDelay: "100ms" }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <Link 
              to="/" 
              className="inline-block text-blog-600 hover:text-blog-800 transition-colors"
            >
              ← Return to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
