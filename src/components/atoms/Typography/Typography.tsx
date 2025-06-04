// src/components/atoms/Typography/Typography.tsx
import React, { type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Typography.module.scss'; // Import SCSS module
import type { JSX } from 'react/jsx-runtime';

type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';

export type TypographyVariant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'label'
  | 'button';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: TypographyElement; // The HTML tag to render, defaults to 'p'
  variant?: TypographyVariant; // The style variant, defaults to 'body1'
  className?: string; // Optional additional class names
  // Other HTMLAttributes like id, onClick, etc., are inherited
}

const Typography = ({
  children,
  as: Component = 'p', 
  variant = 'body1',  
  className = '',
  ...rest
}: TypographyProps): JSX.Element => {
  const combinedClassName = `
    ${styles.typographyBase} 
    ${styles[variant] || ''} 
    ${className}
  `.trim(); // .trim() removes leading/trailing whitespace

  return (
    <Component className={combinedClassName} {...rest}>
      {children}
    </Component>
  );
};

export default Typography;