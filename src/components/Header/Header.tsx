import { NavLink } from 'react-router';
import { useTheme } from '../../shared/ThemeContext';
import { HeaderStyles } from './HeaderStyles';

export function Header() {
  const { toggleTheme } = useTheme();
  const { classNameHeader, classNameLink, buttonClassname } = HeaderStyles();

  return (
    <nav className={classNameHeader}>
      <div className="w-50  mx-auto flex justify-between ">
        <NavLink to="/" className={classNameLink}>
          Home
        </NavLink>
        <NavLink to="/about" className={classNameLink}>
          About
        </NavLink>
      </div>
      <button onClick={toggleTheme} className={buttonClassname}>
        CHANGE THEME
      </button>
    </nav>
  );
}
