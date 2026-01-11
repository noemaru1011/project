import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export interface AccordionItemProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
  className?: string;
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
    onKeyDown?: (e: React.KeyboardEvent) => void;
    buttonRef?: React.Ref<HTMLButtonElement>;
  }
> = ({ title, children, isOpen, onToggle, icon, badge, className, onKeyDown, buttonRef }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);

      const timer = setTimeout(() => {
        setHeight(undefined);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => {
        setHeight(0);
      });
    }
  }, [isOpen]);

  const contentId = `${title}-content`;

  return (
    <div className={clsx('border-b border-gray-200 last:border-b-0', className)}>
      <button
        id={`${title}-header`}
        ref={buttonRef}
        type="button"
        onClick={onToggle}
        onKeyDown={onKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className={clsx(
          'w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset',
          isOpen ? 'bg-indigo-50' : 'bg-white hover:bg-gray-50',
        )}
      >
        <div className="flex items-center gap-3 flex-1">
          {icon && (
            <div
              className={clsx(
                'transition-colors duration-200',
                isOpen ? 'text-indigo-600' : 'text-gray-400',
              )}
            >
              {icon}
            </div>
          )}
          <span
            className={clsx(
              'transition-colors duration-200 font-medium',
              isOpen ? 'text-indigo-700' : 'text-gray-700',
            )}
          >
            {title}
          </span>
          {badge !== undefined && (
            <span
              className={clsx(
                'px-2 py-0.5 text-xs rounded-full transition-colors duration-200',
                isOpen ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600',
              )}
            >
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          size={20}
          className={clsx(
            'transition-all duration-300 flex-shrink-0',
            isOpen ? 'rotate-180 text-indigo-600' : 'rotate-0 text-gray-400',
          )}
        />
      </button>

      <div
        ref={contentRef}
        id={contentId}
        style={{ height, visibility: isOpen || height !== 0 ? 'visible' : 'hidden' }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        role="region"
        aria-labelledby={`${title}-header`}
      >
        <div className="px-5 py-4 bg-gray-50 overflow-x-auto">{children}</div>
      </div>
    </div>
  );
};

export const Accordion = ({ items, allowMultiple = false, className }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const initialOpen = new Set<string>();
    items.forEach((item) => {
      if (item.defaultOpen) {
        initialOpen.add(item.id);
      }
    });
    return initialOpen;
  });

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        buttonRefs.current[(index + 1) % items.length]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        buttonRefs.current[(index - 1 + items.length) % items.length]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        buttonRefs.current[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        buttonRefs.current[items.length - 1]?.focus();
        break;
    }
  };

  return (
    <div className={clsx('bg-white border border-gray-200 rounded-lg overflow-hidden', className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          {...item}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggleItem(item.id)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          buttonRef={(el) => {
            buttonRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
};
