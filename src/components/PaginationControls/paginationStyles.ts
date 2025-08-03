import { useTheme } from '../../shared/ThemeContext';

export function PaginationControlsStyles() {
  const { theme } = useTheme();
  const arrowButtonClassName = `${
    theme === 'light'
      ? 'px-3 py-1 cursor-pointer border border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-50 transition'
      : 'px-3 py-1 cursor-pointer border border-slate-500 text-slate-50 rounded-lg hover:bg-slate-500 transition'
  }`;
  const disabledClassName = `${
    theme === 'light'
      ? 'rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed scale-100'
      : 'rounded-lg bg-slate-950 text-slate-50 cursor-not-allowed scale-100'
  }`;

  const pageClassName = `${
    theme === 'light'
      ? 'px-3 py-1 cursor-pointer text-black hover:text-cyan-500 hover:scale-105 transition'
      : 'px-3 py-1 cursor-pointer text-slate-50 hover:text-slate-500 hover:scale-105 transition'
  }`;
  return {
    arrowButtonClassName,
    disabledClassName,
    pageClassName,
  };
}
