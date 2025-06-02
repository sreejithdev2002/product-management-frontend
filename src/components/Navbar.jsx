import { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router"; // Make sure you're using react-router-dom
import serviceApi from "../axios/axios";

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
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredProducts(allProducts.slice(0, 5));
    } else {
      const filtered = allProducts.filter((product) =>
        product?.title?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 5));
    }
    setShowResults(true);
  };

  const handleFocus = () => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(allProducts.slice(0, 5));
    }
    setShowResults(true);
  };

  const handleResultClick = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  const baseURL = import.meta.env.VITE_BASE_URL;

  return (
    <nav className="bg-[#003F62] py-4 px-4 md:px-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
        {/* Search Section */}
        <div className="w-full md:w-[400px] relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onBlur={() => setTimeout(() => setShowResults(false), 100)}
            placeholder="Search any things"
            className="w-full py-2 pl-4 pr-20 rounded-2xl border bg-white text-sm border-gray-300 focus:outline-none focus:ring focus:ring-[#EDA415]"
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#EDA415] text-sm font-semibold text-white px-6 py-[9px] rounded-2xl hover:bg-[#d7920a] transition"
          >
            Search
          </button>

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
                    <span className="text-sm text-gray-800">
                      {product.title}
                    </span>
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

        {/* Icons & Links */}
        <div className="flex items-center gap-6 md:gap-10">
          <button onClick={onWishlistClick} className="relative text-white">
            <GoHeart size={20} />
            <span className="absolute -top-2 left-3 py-0.5 px-1.5 text-xs rounded-full bg-[#EDA415] text-white">
              {wishlistLength || 0}
            </span>
          </button>

          <Link to="/auth" className="text-white text-sm">
            Sign in
          </Link>

          <Link
            to="/#"
            className="relative flex items-center gap-2 text-white text-sm"
          >
            <FiShoppingCart size={20} />
            Cart
            <span className="absolute -top-2 right-[-10px] py-0.5 px-1.5 text-xs rounded-full bg-[#EDA415] text-white">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
