import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  className?: string;
}

const AccordionItem: React.FC<
  AccordionItemProps & {
    isOpen: boolean;
    onToggle: () => void;
  }
> = ({ title, children, isOpen, onToggle, icon, badge }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
      // Reset to auto after animation completes
      const timer = setTimeout(() => {
        setHeight(undefined);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Set explicit height first for smooth closing animation
      setHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => {
        setHeight(0);
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className={`
          w-full flex items-center justify-between px-5 py-4 
          text-left transition-colors duration-200
          ${isOpen ? 'bg-indigo-50' : 'bg-white hover:bg-gray-50'}
        `}
      >
        <div className="flex items-center gap-3 flex-1">
          {icon && (
            <div
              className={`transition-colors duration-200 ${isOpen ? 'text-indigo-600' : 'text-gray-400'}`}
            >
              {icon}
            </div>
          )}
          <span
            className={`transition-colors duration-200 ${isOpen ? 'text-indigo-700' : 'text-gray-700'}`}
          >
            {title}
          </span>
          {badge !== undefined && (
            <span
              className={`
              px-2 py-0.5 text-xs rounded-full transition-colors duration-200
              ${isOpen ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}
            `}
            >
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`
            size-5 transition-all duration-300 flex-shrink-0
            ${isOpen ? 'rotate-180 text-indigo-600' : 'rotate-0 text-gray-400'}
          `}
        />
      </button>

      <div
        ref={contentRef}
        style={{ height: height }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="px-5 py-4 bg-gray-50 overflow-x-auto">{children}</div>
      </div>
    </div>
  );
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const initialOpen = new Set<string>();
    items.forEach((item) => {
      if (item.defaultOpen) {
        initialOpen.add(item.id);
      }
    });
    return initialOpen;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }

      return newSet;
    });
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          {...item}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
};
