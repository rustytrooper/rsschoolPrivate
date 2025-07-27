import { Header } from '../Header/Header';
import { Outlet } from 'react-router';
export function Layout() {
  return (
    <div className="w-300 mx-auto">
      <Header />
      <Outlet />
    </div>
  );
}
