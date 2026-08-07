import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ButtonPrimary = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-[var(--color-orange)] text-[var(--color-white)] font-semibold uppercase tracking-[0.08em] px-7 py-3.5 rounded-full transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-orange)]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ButtonPrimary.displayName = 'ButtonPrimary';

export const ButtonGhost = React.forwardRef<HTMLButtonElement, ButtonProps & { darkSection?: boolean }>(
  ({ className, children, darkSection = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-transparent border-[1.5px] border-current font-semibold uppercase tracking-[0.08em] px-7 py-3.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          darkSection
            ? "text-[var(--color-white)] hover:bg-[rgba(255,255,255,0.08)] focus-visible:ring-[var(--color-white)]"
            : "text-[var(--color-black)] hover:bg-[rgba(0,0,0,0.05)] focus-visible:ring-[var(--color-black)]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ButtonGhost.displayName = 'ButtonGhost';

export const ButtonNav = React.forwardRef<HTMLButtonElement, ButtonProps & { lightState?: boolean }>(
  ({ className, children, lightState = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "font-semibold uppercase tracking-[0.08em] px-6 py-3 rounded-full text-[0.8125rem] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          lightState
            ? "bg-[var(--color-white)] text-[var(--color-black)] hover:bg-gray-100 focus-visible:ring-[var(--color-black)]"
            : "bg-[var(--color-black)] text-[var(--color-white)] hover:bg-gray-800 focus-visible:ring-[var(--color-white)]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ButtonNav.displayName = 'ButtonNav';
