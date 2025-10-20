import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableProps {
  children: React.ReactNode;
  title?: string;
  defaultOpen?: boolean;
}

export function Table({ children, title, defaultOpen = true }: TableProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="my-6">
      {title && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 mb-3 text-left hover:opacity-80 transition-opacity cursor-pointer"
        >
          <span className="font-semibold text-foreground">{title}</span>
          <div className="flex-shrink-0">
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
            )}
          </div>
        </button>
      )}
      
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg border border-border shadow-sm">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom table elements that will be used in markdown
export const tableComponents = {
  table: ({ children, ...props }: any) => (
    <table className="min-w-full divide-y divide-border" {...props}>
      {children}
    </table>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-muted/50" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: any) => (
    <tbody className="divide-y divide-border bg-background" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: any) => (
    <tr className="hover:bg-muted/30 transition-colors" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: any) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground" {...props}>
      {children}
    </td>
  ),
};
