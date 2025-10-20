import { useState } from "react";
import { ChevronDown, ChevronRight, Info, AlertTriangle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface NoteProps {
  children: React.ReactNode;
  title?: string;
  variant?: "info" | "warning" | "tip";
  defaultOpen?: boolean;
}

export function Note({ children, title = "Note", variant = "info", defaultOpen = false }: NoteProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const variantStyles = {
    info: {
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-800",
      icon: "text-blue-600 dark:text-blue-400",
      title: "text-blue-900 dark:text-blue-100",
      IconComponent: Info
    },
    warning: {
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-800",
      icon: "text-amber-600 dark:text-amber-400",
      title: "text-amber-900 dark:text-amber-100",
      IconComponent: AlertTriangle
    },
    tip: {
      bg: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-200 dark:border-green-800",
      icon: "text-green-600 dark:text-green-400",
      title: "text-green-900 dark:text-green-100",
      IconComponent: Lightbulb
    }
  };

  const styles = variantStyles[variant];
  const IconComponent = styles.IconComponent;

  return (
    <div className={cn(
      "rounded-lg border my-6 overflow-hidden",
      styles.bg,
      styles.border
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 w-full text-left p-4 hover:opacity-80 transition-opacity cursor-pointer"
      >
        <IconComponent className={cn("h-5 w-5 flex-shrink-0", styles.icon)} />
        <span className={cn("font-semibold flex-1", styles.title)}>{title}</span>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
          )}
        </div>
      </button>
      
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-4 pb-4 pl-12 prose prose-sm max-w-none
                       prose-p:text-foreground/80 prose-p:leading-relaxed
                       prose-ul:text-foreground/80 prose-ol:text-foreground/80
                       prose-li:text-foreground/80 prose-strong:text-foreground/90
                       prose-code:text-foreground/90">
          {children}
        </div>
      </div>
    </div>
  );
}
