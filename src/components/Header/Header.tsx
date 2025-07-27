import { NavLink } from 'react-router';

export function Header() {
  const classNameLink =
    'text-white text-lg hover:text-gray-200 transition-colors';
  return (
    <nav className="fixed top-0 left-0 right-0 bg-cyan-500 shadow-md p-2">
      <div className="w-50  mx-auto flex justify-between ">
        <NavLink to="/" className={classNameLink}>
          Home
        </NavLink>
        <NavLink to="/about" className={classNameLink}>
          About
        </NavLink>
      </div>
    </nav>
  );
}
