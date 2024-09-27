import { ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap',
        'rounded-md transition-colors',
        'text-sm font-medium',
        'ring-offset-background focus-visible:ring-ring   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
      )}
      type="button"
      {...props}
    />
  );
});
Button.displayName = 'Button';
