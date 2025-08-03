import { useTheme } from '../../shared/ThemeContext';

export function AboutStyles() {
  const { theme } = useTheme();
  const className = `${
    theme === 'light'
      ? 'text-2xl  text-center text-cyan-600 mb-4 leading-15'
      : 'text-2xl  text-center text-slate-50 mb-4 leading-15'
  }`;
  return { className };
}
