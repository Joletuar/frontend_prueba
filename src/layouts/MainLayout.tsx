import { Outlet } from 'react-router-dom';

import { SideNavbar } from '../components/ui/SideNavbar';
import { Toaster } from 'sonner';

export const MainLayout = () => {
  return (
    <div className='main-layout'>
      <Toaster richColors />
      <SideNavbar />
      <Outlet />
    </div>
  );
};
