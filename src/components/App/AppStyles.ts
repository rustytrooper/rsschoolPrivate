import { useTheme } from '../../shared/ThemeContext';

export function AppStyles() {
  const { theme } = useTheme();
  const buttonClassname = `${
    theme === 'light'
      ? 'absolute w-10 top-4 right-4 text-lg bg-white rounded shadow-md p-2 hover:bg-gray-200 cursor-pointer transition-colors'
      : 'absolute w-10 top-4 right-4 text-lg bg-slate-500 rounded shadow-md p-2 hover:bg-slate-400 cursor-pointer transition-colors'
  }`;
  return { buttonClassname };
}
