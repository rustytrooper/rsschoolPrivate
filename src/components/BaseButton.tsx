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
  return (
    <button
      className={`bg-cyan-500 text-white font-semibold py-2 px-4 rounded hover:bg-cyan-600 cursor-pointer transition-colors ${additionalClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
