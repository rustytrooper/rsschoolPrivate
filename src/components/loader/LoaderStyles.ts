import { useTheme } from '../../shared/ThemeContext';

export function LoaderStyles() {
  const { theme } = useTheme();
  const classPoint = `${
    theme === 'light'
      ? 'w-3 h-3 bg-cyan-500 rounded-full'
      : 'w-3 h-3 bg-slate-300 rounded-full'
  }`;

  return { classPoint };
}
