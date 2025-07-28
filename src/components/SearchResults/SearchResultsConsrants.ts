import { useTheme } from '../../shared/ThemeContext';

export function SearchResultsConstants(className: string) {
  const { theme } = useTheme();
  const bgckClassname = `${
    theme === 'light'
      ? `w-full p-4 shadow-md flex flex-col bg-slate-300 rounded-lg h-[80vh] ${className}`
      : `w-full p-4 shadow-md flex flex-col bg-slate-800 rounded-lg h-[80vh] ${className}`
  }`;
  return { bgckClassname };
}
