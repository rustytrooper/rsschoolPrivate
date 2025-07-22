import { Header } from '../Header/Header';
import { Outlet } from 'react-router';
export function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
