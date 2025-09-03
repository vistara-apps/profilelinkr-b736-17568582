import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'elevated';
}

/**
 * Card component with different variants
 * 
 * @param props - Card props
 * @returns Card component
 */
export default function Card({
  children,
  variant = 'default',
  className = '',
  ...props
}: CardProps) {
  // Base classes
  const baseClasses = 'rounded-lg p-4';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-surface shadow-card',
    outline: 'bg-surface border border-gray-200',
    elevated: 'bg-surface shadow-lg',
  };
  
  // Combine all classes
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
}

/**
 * Card header component
 */
export function CardHeader({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Card title component
 */
export function CardTitle({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-xl font-bold text-primary ${className}`} {...props}>
      {children}
    </h3>
  );
}

/**
 * Card content component
 */
export function CardContent({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

/**
 * Card footer component
 */
export function CardFooter({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  );
}

