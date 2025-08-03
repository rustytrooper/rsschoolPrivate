import type { ButtonHTMLAttributes } from 'react';
import { BaseButtonStyles } from './BaseButtonStyles';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  additionalClasses?: string;
};

export function BaseButton({
  onClick,
  children,
  additionalClasses,
}: ButtonProps) {
  const { className } = BaseButtonStyles(additionalClasses || '');
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
