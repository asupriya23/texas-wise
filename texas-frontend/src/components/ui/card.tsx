// src/components/ui/card.tsx
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl shadow-md p-6 bg-white dark:bg-gray-900 ${className}`}
    >
      {children}
    </div>
  );
}
