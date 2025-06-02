// Remove CustomBreadcrumbs import and usage
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div>
      {/* Only common layout like Navbar/Header/Footer if needed */}
      <Outlet />
    </div>
  );
};

export default Layout;
