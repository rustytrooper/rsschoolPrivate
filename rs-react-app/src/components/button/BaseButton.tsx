import type { ButtonHTMLAttributes } from 'react';
import { buttonClassName } from './ClassNameConst';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  additionalClasses?: string;
};

export function BaseButton({ onClick, children }: ButtonProps) {
  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
}
