// import { useState, useEffect } from "react";
// import { useParams } from "react-router";

// import CustomBreadcrumbs from "../components/CustomBreadCrumbs";
// import Navbar from "../components/Navbar";
// import Wishlist from "../components/Wishlist";

// import { IoMdCheckmark, IoMdClose } from "react-icons/io";
// import { FaMinus, FaPlus } from "react-icons/fa";
// import { GoHeart } from "react-icons/go";
// import serviceApi from "../axios/axios";

// function SingleProductPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
//   const [isWishlistOpen, setWishlistOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [quantity, setQuantity] = useState(1);

//   const [isEditing, setIsEditing] = useState(false);
//   const [editTitle, setEditTitle] = useState("");
//   const [editPrice, setEditPrice] = useState("");
//   const [editQuantity, setEditQuantity] = useState("");

//   const baseUrl = "http://localhost:5000";

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await serviceApi.get(`/product/product/${id}`);
//         setProduct(res.data);
//         setSelectedVariantIndex(0); // Reset variant selection on product change
//         setQuantity(1); // Reset quantity when product/variant changes
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load product.");
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) return <div className="text-center py-20">Loading...</div>;
//   if (error)
//     return <div className="text-center py-20 text-red-600">{error}</div>;
//   if (!product)
//     return <div className="text-center py-20">Product not found</div>;

//   const breadcrumbPaths = [
//     { label: "Home", href: "/" },
//     { label: "Product details", href: "/" },
//     {
//       label: product.subCategory?.name || "Subcategory",
//       href: `/product/${id}`,
//     },
//   ];

//   const selectedVariant = product.variants?.[selectedVariantIndex];

//   return (

//     <div className="mb-20">
//       <Navbar onWishlistClick={() => setWishlistOpen(true)} />
//       <Wishlist
//         isOpen={isWishlistOpen}
//         onClose={() => setWishlistOpen(false)}
//       />

//       <div className="flex items-center justify-between px-20 py-8">
//         <CustomBreadcrumbs paths={breadcrumbPaths} />
//       </div>

//       <div className="flex px-20 gap-10">
//         {/* Left images section */}
//         <div className="flex flex-col gap-4 w-1/2">
//           <div className="w-full h-[350px] border border-gray-300 rounded-2xl bg-white flex items-center justify-center">
//             <img
//               src={
//                 product.images && product.images.length > 0
//                   ? `${baseUrl}/${product.images[0]}`
//                   : "/fallback-image.jpg"
//               }
//               alt={product.title}
//               className="max-h-full max-w-full object-contain"
//             />
//           </div>

//           <div className="flex gap-4">
//             {product.images &&
//               product.images.slice(1, 3).map((img, idx) => (
//                 <div
//                   key={idx}
//                   className="w-1/2 h-[150px] border border-gray-300 rounded-2xl bg-white flex items-center justify-center"
//                 >
//                   <img
//                     src={`${baseUrl}/${img}`}
//                     alt={`${product.title} ${idx + 2}`}
//                     className="max-h-full max-w-full object-contain"
//                   />
//                 </div>
//               ))}
//           </div>
//         </div>

//         {/* Right side content */}
//         <div className="flex-1 space-y-3">
//           <h2 className="text-[#003F62] text-xl font-semibold">
//             {product.title}
//           </h2>

//           <h3 className="text-[#4A4A4A] text-xl font-semibold">
//             {product.variants && product.variants.length > 0
//               ? `$${product.variants[selectedVariantIndex]?.price}`
//               : "Price not available"}
//           </h3>

//           <div className="flex gap-x-3">
//             <p>Availability:</p>
//             {selectedVariant?.quantity < 1 ? (
//               <div className="flex items-center space-x-1">
//                 <IoMdClose color="red" />
//                 <span className="text-red-500">Out Of Stock</span>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-1">
//                 <IoMdCheckmark color="green" />
//                 <span className="text-green-700">In Stock</span>
//               </div>
//             )}
//           </div>

//           <p className="text-xs text-[#5D5D5D]">
//             {selectedVariant?.quantity < 1
//               ? ""
//               : `Hurry up! Only ${
//                   selectedVariant?.quantity || "N/A"
//                 } product left in
//             stock!`}
//           </p>

//           <div className="border border-[#BDBDBD] w-full my-10" />

//           <div className="flex items-center gap-x-5">
//             <h2 className="font-semibold text-[#232323]">Variants:</h2>
//             {product.variants &&
//               product.variants.map((variant, idx) => (
//                 <button
//                   key={idx}
//                   className={`py-2 px-4 border-2 rounded-lg ${
//                     selectedVariantIndex === idx
//                       ? "bg-[#003F62] text-white"
//                       : "bg-[#EEEEEE]"
//                   }`}
//                   onClick={() => setSelectedVariantIndex(idx)}
//                 >
//                   {variant.ram || variant.name || `Option ${idx + 1}`}
//                 </button>
//               ))}
//           </div>

//           {/* Quantity Section */}
//           {selectedVariant?.quantity > 0 ? (
//             <div className="flex items-center my-5">
//               <h2 className="font-semibold text-[#232323] mr-5">Quantity:</h2>
//               <button
//                 onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//                 className="p-3 border border-[#BDBDBD] bg-[#EEEEEE]"
//                 disabled={quantity <= 1}
//               >
//                 <FaMinus size={8} />
//               </button>
//               <div className="py-1 px-8 border border-[#BDBDBD] bg-[#EEEEEE]">
//                 {quantity}
//               </div>
//               <button
//                 onClick={() =>
//                   setQuantity((prev) =>
//                     Math.min(selectedVariant?.quantity, prev + 1)
//                   )
//                 }
//                 className="p-3 border border-[#BDBDBD] bg-[#EEEEEE]"
//                 disabled={quantity >= selectedVariant?.quantity}
//               >
//                 <FaPlus size={8} />
//               </button>
//             </div>
//           ) : (
//             <div className="my-5 text-red-600 font-semibold text-lg">
//               Out of Stock
//             </div>
//           )}

//           <div className="flex items-center gap-x-5 mt-8">
//             {/* <button className="bg-[#EDA415] font-semibold py-3 px-8 rounded-3xl text-white">
//               Edit Product
//             </button> */}
//             <button
//               className="bg-[#EDA415] font-semibold py-3 px-8 rounded-3xl text-white"
//               onClick={() => {
//                 setIsEditing(true);
//                 setEditTitle(product.title);
//                 setEditPrice(selectedVariant?.price || "");
//                 setEditQuantity(selectedVariant?.quantity || "");
//               }}
//             >
//               Edit Product
//             </button>

//             <button className="bg-[#EDA415] font-semibold py-3 px-8 rounded-3xl text-white">
//               Buy it now
//             </button>
//             <button className="p-3 rounded-full bg-[#EEEEEE]">
//               <GoHeart size={24} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SingleProductPage;

import { useState, useEffect } from "react";
import { useParams } from "react-router";

import CustomBreadcrumbs from "../components/CustomBreadCrumbs";
import Navbar from "../components/Navbar";
import Wishlist from "../components/Wishlist";

import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import serviceApi from "../axios/axios";

function SingleProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isWishlistOpen, setWishlistOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [subCategories, setSubcategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  // Local state for edit form
  const [productTitle, setProductTitle] = useState("");
  const [variants, setVariants] = useState([]);

  const baseUrl = "http://localhost:5000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await serviceApi.get(`/product/product/${id}`);
        setProduct(res.data);
        setSelectedVariantIndex(0);
        setQuantity(1);

        // Initialize edit form state
        setProductTitle(res.data.title);
        setDescription(res.data.description);
        setVariants(
          res.data.variants.map((variant) => ({
            price: variant.price,
            quantity: variant.quantity,
            ram: variant.ram || "",
            name: variant.name || "",
          }))
        );
        setLoading(false);
      } catch (err) {
        setError("Failed to load product.");
        setLoading(false);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const res = await serviceApi.get("/sub-category/get-sub-category");
        setSubcategories(res.data);
      } catch (error) {
        console.error("Failed to fetch subcategories:", error);
      }
    };

    fetchSubCategories();
    fetchProduct();
  }, [id]);

  const handleSaveEdit = async () => {
    try {
      setIsSaving(true);

      // Prepare variants data, ensure price as float and quantity as integer with default values
      const updatedVariants = variants.map((variant) => ({
        ram: variant.ram,
        price: parseFloat(variant.price),
        quantity: parseInt(variant.quantity),
      }));

      const updatedData = {
        title,
        description,
        variants: updatedVariants,
      };

      await serviceApi.put(`/product/edit-product/${id}`, updatedData);

      console.log("Sending product update payload:", updatedData);

      await serviceApi.put(`/product/edit-product/${id}`, updatedData);

      setProduct((prev) => ({
        ...prev,
        title: updatedData.title,
        description: updatedData.description,
        variants: updatedVariants,
      }));

      setIsSaving(false);
      setEditOpen(false);
    } catch (err) {
      alert("Failed to update product.");
      setIsSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  const breadcrumbPaths = [
    { label: "Home", href: "/" },
    { label: "Product details", href: "/" },
    {
      label: product.subCategory?.name || "Subcategory",
      href: `/product/${id}`,
    },
  ];

  const selectedVariant = product.variants?.[selectedVariantIndex];

  return (
    <div className="mb-20">
      <Navbar onWishlistClick={() => setWishlistOpen(true)} />
      <Wishlist
        isOpen={isWishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />

      <div className="flex items-center justify-between px-20 py-8">
        <CustomBreadcrumbs paths={breadcrumbPaths} />
      </div>

      <div className="flex px-20 gap-10">
        {/* Left images section */}
        <div className="flex flex-col gap-4 w-1/2">
          <div className="w-full h-[350px] border border-gray-300 rounded-2xl bg-white flex items-center justify-center">
            <img
              src={
                product.images && product.images.length > 0
                  ? `${baseUrl}/${product.images[0]}`
                  : "/fallback-image.jpg"
              }
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="flex gap-4">
            {product.images &&
              product.images.slice(1, 3).map((img, idx) => (
                <div
                  key={idx}
                  className="w-1/2 h-[150px] border border-gray-300 rounded-2xl bg-white flex items-center justify-center"
                >
                  <img
                    src={`${baseUrl}/${img}`}
                    alt={`${product.title} ${idx + 2}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Right side content */}
        <div className="flex-1 space-y-3">
          <h2 className="text-[#003F62] text-xl font-semibold">
            {product.title}
          </h2>

          <h3 className="text-[#4A4A4A] text-xl font-semibold">
            {product.variants && product.variants.length > 0
              ? `$${product.variants[selectedVariantIndex]?.price}`
              : "Price not available"}
          </h3>

          <div className="flex gap-x-3">
            <p>Availability:</p>
            {selectedVariant?.quantity < 1 ? (
              <div className="flex items-center space-x-1">
                <IoMdClose color="red" />
                <span className="text-red-500">Out Of Stock</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <IoMdCheckmark color="green" />
                <span className="text-green-700">In Stock</span>
              </div>
            )}
          </div>

          <p className="text-xs text-[#5D5D5D]">
            {selectedVariant?.quantity < 1
              ? ""
              : `Hurry up! Only ${
                  selectedVariant?.quantity || "N/A"
                } product left in stock!`}
          </p>

          <div className="border border-[#BDBDBD] w-full my-10" />

          <div className="flex items-center gap-x-5">
            <h2 className="font-semibold text-[#232323]">Variants:</h2>
            {product.variants &&
              product.variants.map((variant, idx) => (
                <button
                  key={idx}
                  className={`py-2 px-4 border-2 rounded-lg ${
                    selectedVariantIndex === idx
                      ? "bg-[#003F62] text-white"
                      : "bg-[#EEEEEE]"
                  }`}
                  onClick={() => setSelectedVariantIndex(idx)}
                >
                  {variant.ram || variant.name || `Option ${idx + 1}`}
                </button>
              ))}
          </div>

          {/* Quantity Section */}
          {selectedVariant?.quantity > 0 ? (
            <div className="flex items-center my-5">
              <h2 className="font-semibold text-[#232323] mr-5">Quantity:</h2>
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="p-3 border border-[#BDBDBD] bg-[#EEEEEE]"
                disabled={quantity <= 1}
              >
                <FaMinus size={8} />
              </button>
              <div className="py-1 px-8 border border-[#BDBDBD] bg-[#EEEEEE]">
                {quantity}
              </div>
              <button
                onClick={() =>
                  setQuantity((prev) =>
                    Math.min(selectedVariant?.quantity, prev + 1)
                  )
                }
                className="p-3 border border-[#BDBDBD] bg-[#EEEEEE]"
                disabled={quantity >= selectedVariant?.quantity}
              >
                <FaPlus size={8} />
              </button>
            </div>
          ) : (
            <div className="my-5 text-red-600 font-semibold text-lg">
              Out of Stock
            </div>
          )}

          <div className="flex items-center gap-x-5 mt-8">
            <button
              onClick={() => setEditOpen(true)}
              className="bg-[#EDA415] font-semibold py-3 px-8 rounded-3xl text-white"
            >
              Edit Product
            </button>
            <button className="bg-[#EDA415] font-semibold py-3 px-8 rounded-3xl text-white">
              Buy it now
            </button>
            <button className="p-3 rounded-full bg-[#EEEEEE]">
              <GoHeart size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000a3] z-50 overflow-y-auto">
          <div className="bg-white py-6 px-10 rounded-xl w-[700px] max-h-[90vh] overflow-y-auto shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-[#3C3C3C] text-center">
              Edit Product
            </h2>

            <div className="space-y-5">
              {/* Title */}
              <div className="flex items-center gap-4">
                <label className="w-1/4 text-sm text-[#3C3C3C73]">
                  Title :
                </label>
                <input
                  type="text"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  placeholder="Enter product title"
                  className="flex-1 border border-gray-300 px-4 py-2 rounded-md text-sm"
                />
              </div>

              {/* Variants */}
              <div className="flex items-start gap-4">
                <label className="w-1/4 text-sm text-[#3C3C3C73] pt-2">
                  Variants :
                </label>
                <div className="flex-1 space-y-2">
                  {variants.map((variant, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      {/* RAM */}
                      <div className="space-x-2 flex items-center">
                        <label className="text-[#3C3C3C73] text-sm">Ram:</label>
                        <input
                          type="text"
                          placeholder="RAM"
                          value={variant.ram}
                          onChange={(e) => {
                            const updated = [...variants];
                            updated[idx].ram = e.target.value;
                            setVariants(updated);
                          }}
                          className="w-[70px] border border-gray-300 px-2 py-1 rounded-md text-sm"
                        />
                      </div>

                      {/* Price with $ */}
                      <div className="space-x-2 flex items-center">
                        <label className="text-[#3C3C3C73] text-sm">
                          Price:
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md px-2 py-1">
                          <span className="text-sm text-gray-500 mr-1">$</span>
                          <input
                            type="text"
                            placeholder="0"
                            value={variant.price}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow digits and optional decimal point
                              if (/^\d*\.?\d*$/.test(value)) {
                                const updated = [...variants];
                                updated[idx].price = value;
                                setVariants(updated);
                              }
                            }}
                            className="w-[60px] outline-none text-sm text-right"
                          />
                        </div>
                      </div>

                      {/* Quantity with < > style */}
                      <div className="space-x-2 flex items-center">
                        <label className="text-[#3C3C3C73] text-sm">QTY:</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-2 py-1">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...variants];
                              const currentQty =
                                parseInt(updated[idx].quantity) || 1;
                              if (currentQty > 1)
                                updated[idx].quantity = currentQty - 1;
                              setVariants(updated);
                            }}
                            className="px-2 text-gray-500"
                          >
                            &lt;
                          </button>
                          <input
                            type="text"
                            value={variant.quantity}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow only digits, no letters
                              if (/^\d*$/.test(value)) {
                                const updated = [...variants];
                                updated[idx].quantity = value;
                                setVariants(updated);
                              }
                            }}
                            className="w-[40px] text-center outline-none text-sm"
                          />

                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...variants];
                              const currentQty =
                                parseInt(updated[idx].quantity) || 1;
                              updated[idx].quantity = currentQty + 1;
                              setVariants(updated);
                            }}
                            className="px-2 text-gray-500"
                          >
                            &gt;
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add variants button */}
                  {variants.length < 5 && (
                    <div className="flex justify-end mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setVariants([
                            ...variants,
                            { ram: "", price: "", quantity: "" },
                          ])
                        }
                        className="text-xs bg-[#3C3C3C] text-white py-2 px-5 rounded-lg"
                      >
                        Add variants
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sub Category */}
              <div className="flex items-center gap-4">
                <label className="w-1/4 text-sm text-[#3C3C3C73]">
                  Sub category :
                </label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="flex-1 border border-gray-300 px-4 py-2 rounded-md text-sm"
                >
                  <option value="">Select Sub Category</option>
                  {subCategories.map((subCat) => (
                    <option key={subCat._id} value={subCat._id}>
                      {subCat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="flex items-center gap-4">
                <label className="w-1/4 text-sm text-[#3C3C3C73]">
                  Description :
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter product description"
                  className="flex-1 border border-gray-300 px-4 py-2 rounded-md text-sm resize-y"
                  rows={3}
                />
              </div>

              {/* Upload image */}
              <div className="flex items-start gap-4">
                <label className="w-1/4 text-sm text-[#3C3C3C73] pt-2">
                  Upload image:
                </label>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const selectedFiles = Array.from(e.target.files);

                      // Prevent more than 3 total
                      const totalFiles = [...images, ...selectedFiles].slice(
                        0,
                        3
                      );

                      setImages(totalFiles);
                    }}
                    className="text-sm mb-2"
                  />

                  <div className="flex gap-2">
                    {images.map((img, idx) => (
                      <img
                        key={idx}
                        src={URL.createObjectURL(img)}
                        alt="preview"
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    ))}
                    {images.length < 3 && (
                      <div className="w-20 h-20 border border-dashed border-gray-400 rounded-md flex items-center justify-center">
                        <span className="text-gray-400 text-xl">+</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-6 pt-4">
                <button
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                  className={`bg-[#003F62] text-white font-semibold py-3 px-8 rounded-3xl w-full ${
                    isSaving ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={() => setEditOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md font-medium"
                >
                  DISCARD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleProductPage;
