// import { GoHeart } from "react-icons/go";
// import { FiShoppingCart } from "react-icons/fi";
// import { Link } from "react-router";

// function Navbar({ onWishlistClick }) {
//   return (
//     <nav className="bg-[#003F62] py-5 flex justify-between">
//       <div className="relative w-92 left-80">
//         <input
//           type="text"
//           placeholder="Search any things"
//           className="w-full py-3 pl-4 pr-20 rounded-2xl border bg-white text-sm border-gray-300 focus:outline-none focus:ring focus:ring-[#EDA415]"
//         />
//         <button
//           type="submit"
//           className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#EDA415] text-sm font-semibold text-white px-8 py-[13px] rounded-2xl hover:bg-[#d7920a] transition"
//         >
//           Search
//         </button>
//       </div>
//       <div className="flex relative right-40 items-center gap-x-8">
//         <button onClick={onWishlistClick} className="cursor-pointer">
//           <GoHeart size={20} color="#fff" />
//           <span className="absolute -top-2 py-1 px-2 text-xs rounded-full bg-[#EDA415]">
//             4
//           </span>
//         </button>
//         <Link to="/auth">
//           <h3 className="text-white cursor-pointer">Sign in</h3>
//         </Link>
//         <Link to="/#">
//           <span className="flex items-center text-white gap-x-2 cursor-pointer">
//             <FiShoppingCart size={20} color="#fff" /> Cart
//           </span>
//           <span className="absolute -top-2 right-5 py-1 px-2 text-xs rounded-full bg-[#EDA415]">
//             2
//           </span>
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router"; // Ensure you're using react-router-dom in your project
import serviceApi from "../axios/axios"; // Adjust path if needed

function Navbar({ onWishlistClick }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [wishlistLength, setWishlistLength] = useState("");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await serviceApi.get("/product/get-products");
        const wishlist = await serviceApi.get("/wishlist/get");
        setWishlistLength(wishlist.data.wishlist.length);
        setAllProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [onWishlistClick]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredProducts(allProducts.slice(0, 5)); // Show top 5 if query is empty
      setShowResults(true);
    } else {
      const filtered = allProducts.filter((product) =>
        product?.title?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 5)); // Limit to 5 results
      setShowResults(true);
    }
  };

  const handleFocus = () => {
    // Show top 5 products when input is focused and empty
    if (searchQuery.trim() === "") {
      setFilteredProducts(allProducts.slice(0, 5));
      setShowResults(true);
    }
  };

  const handleResultClick = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  const baseURL = "http://localhost:5000";

  return (
    <nav className="bg-[#003F62] py-5 flex justify-between relative">
      <div className="relative w-92 left-80">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={() => setTimeout(() => setShowResults(false), 100)}
          placeholder="Search any things"
          className="w-full py-3 pl-4 pr-20 rounded-2xl border bg-white text-sm border-gray-300 focus:outline-none focus:ring focus:ring-[#EDA415]"
        />
        <button
          type="submit"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#EDA415] text-sm font-semibold text-white px-8 py-[13px] rounded-2xl hover:bg-[#d7920a] transition"
        >
          Search
        </button>

        {/* 🔍 Search Result Dropdown */}
        {showResults && (
          <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg max-h-72 overflow-y-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 border-b border-[#EDA415]"
                  onClick={handleResultClick}
                >
                  <img
                    src={`${baseURL}/${product?.images?.[0]}`}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="text-sm text-gray-800">{product.title}</span>
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No products found.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex relative right-40 items-center gap-x-8">
        <button onClick={onWishlistClick} className="cursor-pointer relative">
          <GoHeart size={20} color="#fff" />
          <span className="absolute -top-5 left-3 py-1 px-2 text-xs rounded-full bg-[#EDA415] text-white">
            {wishlistLength}
          </span>
        </button>
        <Link to="/auth">
          <h3 className="text-white cursor-pointer">Sign in</h3>
        </Link>
        <Link to="/#">
          <span className="flex items-center text-white gap-x-2 cursor-pointer">
            <FiShoppingCart size={20} color="#fff" /> Cart
          </span>
          <span className="absolute -top-2 right-5 py-1 px-2 text-xs rounded-full bg-[#EDA415] text-white">
            2
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
