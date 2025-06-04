import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      {/* No Navbar here */}
      <Outlet />
    </div>
  );
};

export default PublicLayout;
