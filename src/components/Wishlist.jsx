import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { Link } from "react-router-dom"; // use react-router-dom for v5 or v6
import serviceApi from "../axios/axios"; // Your axios instance

function Wishlist({ isOpen, onClose }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist items when component mounts or when isOpen changes to true
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      serviceApi
        .get("/wishlist/get") // adjust endpoint according to your backend
        .then((res) => {
          setWishlistItems(res.data.wishlist || []); // Assuming backend returns { wishlist: [...] }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch wishlist:", err);
          setLoading(false);
        });
    }
  }, [isOpen]);

  // Optional: Remove item from wishlist
  const handleRemove = async (productId) => {
    try {
      console.log("Removing productId:", productId);
      const response = await serviceApi.post("/wishlist/remove", { productId });
      console.log("Remove response:", response.data);
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Remove error:", error);
      alert(
        "Failed to remove from wishlist: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const baseURL = import.meta.env.VITE_BASE_URL;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/2 md:w-1/3 lg:w-1/4 bg-white shadow-2xl z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="bg-[#003F62] text-white px-4 py-[12.8px] flex justify-between items-center">
        <div className="flex items-center">
          <span className="bg-white p-3 rounded-full mx-3">
            <GoHeart size={20} color="black" />
          </span>
          <h2 className="text-lg">Items</h2>
        </div>
        <button onClick={onClose} className="cursor-pointer">
          <MdOutlineArrowForwardIos size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-56px)]">
        {loading ? (
          <p>Loading...</p>
        ) : wishlistItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            Your wishlist is empty.
          </p>
        ) : (
          wishlistItems.map((item) => (
            <div
              key={item._id}
              className="flex items-start gap-3 border-b border-b-[#ACACAC] pb-4"
            >
              <Link to={`/product/${item._id}`}>
                <img
                  src={`${baseURL}/${item.images?.[0]}`}
                  alt={item.title}
                  className="w-20 h-20 rounded-xl object-cover border border-[#ACACAC]"
                />
              </Link>
              <div className="flex-1">
                <Link to={`/product/${item._id}`}>
                  <h3 className="text-sm font-medium text-[#003F62] truncate">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-sm font-semibold text-[#4A4A4A]">
                  ${item.variants?.[0]?.price ?? "N/A"}
                </p>
                <div className="flex text-gray-400 mt-1">
                  <span>{"⭐️".repeat(item.rating || 4)}</span>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="self-center hover:text-red-500 cursor-pointer"
                aria-label={`Remove ${item.title} from wishlist`}
              >
                <IoCloseCircleOutline size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;
