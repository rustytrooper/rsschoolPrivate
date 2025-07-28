import { useTheme } from '../../shared/ThemeContext';

export function BaseButtonStyles(additionalClasses: string) {
  const { theme } = useTheme();
  const className = `${
    theme === 'light'
      ? `bg-cyan-500 text-white font-semibold py-2 px-4 rounded hover:bg-cyan-600 cursor-pointer transition-colors ${additionalClasses}`
      : `bg-slate-950 text-white font-semibold py-2 px-4 rounded hover:bg-slate-800 cursor-pointer transition-colors ${additionalClasses}`
  }`;
  return { className };
}
