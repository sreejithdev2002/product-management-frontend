import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Wishlist from "../components/Wishlist";
import { useState } from "react";

const PrivateLayout = () => {
  const [isWishlistOpen, setWishlistOpen] = useState(false);

  return (
    <div>
      <Navbar onWishlistClick={() => setWishlistOpen(true)} />
      <Wishlist
        isOpen={isWishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />


      <Outlet />
    </div>
  );
};

export default PrivateLayout;
