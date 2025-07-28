import { BaseButtonStyles } from './BaseButtonStyles';

interface BaseButtonProps {
  onClick: VoidFunction;
  children: string;
  additionalClasses?: string;
}

export function BaseButton({
  onClick,
  children,
  additionalClasses,
}: BaseButtonProps) {
  const { className } = BaseButtonStyles(additionalClasses || '');
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
