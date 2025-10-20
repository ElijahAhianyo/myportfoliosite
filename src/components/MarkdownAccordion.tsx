import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface MarkdownAccordionProps {
  children: React.ReactNode;
  title?: string;
  defaultOpen?: boolean;
}

export const MarkdownAccordion: React.FC<MarkdownAccordionProps> = ({
  children,
  title = 'Details',
  defaultOpen = false,
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen ? 'item-1' : undefined}
      className="my-6 border rounded-lg"
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50 rounded-t-lg">
          <span className="font-semibold text-left">{title}</span>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {children}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
