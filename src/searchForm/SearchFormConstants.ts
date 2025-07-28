import { useTheme } from '../shared/ThemeContext';

export function SearchFormConstants() {
  const { theme } = useTheme();
  const inputClassname = `${
    theme === 'light'
      ? 'w-80 flex px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
      : 'w-80 flex px-4 py-3 text-slate-50 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent'
  }`;
  return { inputClassname };
}
