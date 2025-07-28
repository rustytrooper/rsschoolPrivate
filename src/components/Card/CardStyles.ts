import { useTheme } from '../../shared/ThemeContext';

export function CardStyles() {
  const { theme } = useTheme();
  const bgckClassname = `${
    theme === 'light'
      ? 'h-full bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1'
      : 'h-full bg-slate-600 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1'
  }`;
  const pClassName = `${
    theme === 'light' ? 'mt-2 text-gray-900' : 'mt-2 text-slate-50'
  }`;
  return { bgckClassname, pClassName };
}
