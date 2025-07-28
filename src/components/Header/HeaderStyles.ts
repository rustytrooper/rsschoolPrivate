import { useTheme } from '../../shared/ThemeContext';

export function HeaderStyles() {
  const { theme } = useTheme();
  const classNameHeader = `${
    theme === 'light'
      ? 'fixed top-0 left-0 right-0 bg-cyan-500 shadow-md p-2'
      : 'fixed top-0 left-0 right-0 bg-slate-950 shadow-md p-2'
  }`;
  const classNameLink =
    'text-white text-lg hover:text-gray-200 transition-colors';
  const buttonClassname =
    ' text-white right-0 text-lg hover:text-gray-200 transition-colors cursor-pointer';

  return { classNameHeader, classNameLink, buttonClassname };
}
