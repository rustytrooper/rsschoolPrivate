import { Header } from '../Header/Header';
import { Outlet } from 'react-router';
export function Layout() {
  return (
    <div className="w-300 mt-13 mx-auto flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
