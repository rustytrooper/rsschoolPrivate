import { useTheme } from '../../shared/ThemeContext';

export function DetailsPanelStyles() {
  const { theme } = useTheme();
  const bgckClassname = `${
    theme === 'light'
      ? 'w-150 h-150 mx-auto my-auto border border-cyan-500 rounded-3xl bg-slate-300 p-4 relative flex items-center justify-center'
      : 'w-150 h-150 mx-auto my-auto border border-slate-500 rounded-3xl bg-slate-600 p-4 relative flex items-center justify-center'
  }`;
  const paragraphStyle = 'text-lg leading-7 mb-10';
  return { bgckClassname, paragraphStyle };
}
