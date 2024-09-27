import { PopoverContentProps } from '@radix-ui/react-popover';
import { MarkdownToJSX } from 'markdown-to-jsx';
import { ReactNode } from 'react';

import { Button } from '@/components/atoms/Button/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/Popover/Popover';
import { RichText } from '@/components/atoms/RichText/RichText';
import { cn } from '@/utils/cn';

import { checkReadingComplete } from './utils/checkReadingComplete';
import { completeReading } from './utils/completeReading';

type WhatIsNewProps = {
  content: string;
  contentMarkdownOptions?: MarkdownToJSX.Options;
  version: string;
  children?: ReactNode;
  align?: PopoverContentProps['align'];
  side?: PopoverContentProps['side'];
  classNames?: {
    trigger?: string;
    popover?: string;
    content?: string;
  };
};

export const WhatIsNew = ({
  children,
  content,
  version,
  contentMarkdownOptions,
  align,
  side,
  classNames
}: WhatIsNewProps) => {
  const isReadingComplete = checkReadingComplete(version);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      completeReading(version);
    }
  };

  if (isReadingComplete) return null;
  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button className={cn('fixed bottom-10 left-10 z-10', classNames?.trigger)}>
          {children || "What's new?"}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className={cn('flex flex-col gap-4', classNames?.popover)}
        side={side}
      >
        <div className={cn('max-h-[calc(100vh-200px)] overflow-auto', classNames?.content)}>
          <RichText markdown={content} options={contentMarkdownOptions} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
