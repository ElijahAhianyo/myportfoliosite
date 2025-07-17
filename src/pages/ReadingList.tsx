import { Book, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReadingList = () => {
  // Empty state for now - will be populated later
  const books: any[] = [];
  const papers: any[] = [];

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      <div className="relative">
        <Sparkles className="h-16 w-16 text-primary animate-pulse" />
        <div className="absolute inset-0 animate-ping">
          <Sparkles className="h-16 w-16 text-primary/30" />
        </div>
      </div>
      <div className="text-center space-y-2 max-w-md">
        <h3 className="text-xl font-semibold">Coming Soon!</h3>
        <p className="text-muted-foreground">
          I'm curating an amazing collection of books and papers that have shaped my thinking. 
          Check back soon for some mind-bending recommendations!
        </p>
      </div>
      <div className="flex items-center space-x-2 text-sm text-muted-foreground animate-bounce">
        <Book className="h-4 w-4" />
        <span>•</span>
        <FileText className="h-4 w-4" />
        <span>•</span>
        <Book className="h-4 w-4" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Reading List
            </h1>
            <p className="text-xl text-muted-foreground">
              Books and papers that have influenced my thinking and approach to technology.
            </p>
          </div>
          
          {books.length === 0 && papers.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-12">
              {books.length > 0 && (
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center space-x-2">
                    <Book className="h-6 w-6" />
                    <span>Books</span>
                  </h2>
                  <div className="grid gap-6">
                    {books.map((book, index) => (
                      <div key={index} className="p-6 rounded-lg border">
                        {/* Book content will go here */}
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {papers.length > 0 && (
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center space-x-2">
                    <FileText className="h-6 w-6" />
                    <span>Papers</span>
                  </h2>
                  <div className="grid gap-6">
                    {papers.map((paper, index) => (
                      <div key={index} className="p-6 rounded-lg border">
                        {/* Paper content will go here */}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingList;