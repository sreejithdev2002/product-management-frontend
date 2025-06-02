import { GoHeart } from "react-icons/go";
import { useState } from "react";
import serviceApi from "../axios/axios"; // adjust path if needed

function ProductCard({ product }) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const imageUrl = `${baseURL}/${product.images?.[0] || "fallback.jpg"}`;

  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleNavigation = () => {
    window.location.href = `/product/${product._id}`;
  };

  const handleAddToWishlist = async (e) => {
    e.stopPropagation(); // Prevent click from triggering navigation

    try {
      const response = await serviceApi.post("/wishlist/add", {
        productId: product._id,
      });

      if (response.status === 200) {
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error(
        "Failed to add to wishlist:",
        error.response?.data || error
      );
    }
  };

  return (
    <div className="relative h-auto w-80 border border-gray-300 rounded-2xl overflow-hidden bg-white flex flex-col hover:shadow-md transition-shadow">
      <div
        onClick={handleAddToWishlist}
        className={`absolute top-2 right-2 z-10 p-2 rounded-full shadow-sm cursor-pointer transition ${
          isWishlisted
            ? "bg-red-100 text-red-500"
            : "bg-blue-100 hover:text-red-500"
        }`}
      >
        <GoHeart size={20} />
      </div>

      <div
        onClick={handleNavigation}
        className="h-64 flex items-center justify-center bg-white"
      >
        <img
          src={imageUrl}
          alt={product.title || "Product Image"}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="p-3 flex flex-col justify-between flex-grow space-y-2">
        <h2
          onClick={handleNavigation}
          className="text-lg font-semibold text-blue-900 truncate"
        >
          {product.title}
        </h2>
        <h3 className="text-base font-bold text-gray-700">
          ${product.variants?.[0]?.price || "N/A"}
        </h3>
        <p className="text-sm text-yellow-500">
          {"⭐️".repeat(product.rating || 4)}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
