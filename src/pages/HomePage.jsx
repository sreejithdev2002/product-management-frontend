import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CustomBreadcrumbs from "../components/CustomBreadCrumbs";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import PaginationComponent from "../components/PaginationComponent";
import Wishlist from "../components/Wishlist";
import serviceApi from "../axios/axios";

function HomePage() {
  const breadcrumbPaths = [{ label: "Home", href: "/" }];

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    all: false,
    subcategoryIds: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showAddSubCategoryForm, setShowAddSubCategoryForm] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const [productTitle, setProductTitle] = useState("");
  const [variants, setVariants] = useState([
    { ram: "", price: "", quantity: "" },
  ]);
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const [isWishlistOpen, setWishlistOpen] = useState(false);

  // Handle filter changes from Sidebar
  const handleFiltersChange = (filters) => {
    setActiveFilters(filters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Apply filters to products
  const applyFilters = () => {
    if (activeFilters.all || activeFilters.subcategoryIds.length === 0) {
      setFilteredProducts(products);
      setTotalItems(products.length);
    } else {
      const filtered = products.filter((product) => {
        // Check if product's subcategory is in the selected filters
        return activeFilters.subcategoryIds.includes(
          product.subCategory?._id || product.subCategory
        );
      });
      setFilteredProducts(filtered);
      setTotalItems(filtered.length);
    }
  };

  // Get paginated products for display
  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    try {
      const res = await serviceApi.post("/category/create-category", {
        name: categoryName,
      });

      console.log("Category Added:", res.data);
      fetchCategories(); // Refresh categories
      setCategoryName("");
      setShowAddCategoryForm(false);
    } catch (err) {
      console.error("Error adding category:", err);
      alert("Failed to add category. Please try again.");
    }
  };

  const handleAddSubCategory = async () => {
    if (!subCategoryName.trim() || !selectedCategory) {
      alert("Please enter subcategory name and select a category.");
      return;
    }

    try {
      const res = await serviceApi.post("/sub-category/create-sub-category", {
        name: subCategoryName,
        category: selectedCategory,
      });

      console.log("Sub Category Added:", res.data);

      fetchSubCategories(); // Refresh subcategories
      setSubCategoryName("");
      setSelectedCategory("");
      setShowAddSubCategoryForm(false);
    } catch (error) {
      console.error("Error adding subcategory:", error);
      alert("Failed to add subcategory");
    }
  };

  const handleAddProduct = async () => {
    if (!productTitle.trim()) {
      alert("Please enter product title.");
      return;
    }
    if (!subCategory) {
      alert("Please select a subcategory.");
      return;
    }
    if (variants.some((v) => !v.ram.trim() || !v.price || !v.quantity)) {
      alert("Please fill all variant details.");
      return;
    }
    if (!description.trim()) {
      alert("Please enter product description.");
      return;
    }
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", productTitle);
      formData.append("subCategory", subCategory);
      formData.append("description", description);
      formData.append("variants", JSON.stringify(variants));

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const res = await serviceApi.post("/product/create-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Product added:", res.data);

      setProductTitle("");
      setVariants([{ ram: "", price: "", quantity: "" }]);
      setSubCategory("");
      setDescription("");
      setImages([]);
      setShowAddProductForm(false);

      fetchProducts(); // Refresh products
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await serviceApi.get("/category/get-category");
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
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

  const fetchProducts = async () => {
    try {
      // Fetch all products for client-side filtering
      const res = await serviceApi.get(
        `/product/get-products?page=1&limit=1000`
      );
      setProducts(res.data.products || res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchProducts();
  }, []);

  // Apply filters whenever products or activeFilters change
  useEffect(() => {
    applyFilters();
  }, [products, activeFilters]);

  return (
    <div className="mb-20">
      <Navbar onWishlistClick={() => setWishlistOpen(true)} />
      <Wishlist
        isOpen={isWishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
      <div className="flex items-center justify-between px-20 py-8">
        <CustomBreadcrumbs paths={breadcrumbPaths} />
        <div className="space-x-8">
          <button
            onClick={() => setShowAddCategoryForm(true)}
            className="bg-[#EDA415] text-white px-5 py-3 rounded-2xl"
          >
            Add Category
          </button>
          <button
            onClick={() => setShowAddSubCategoryForm(true)}
            className="bg-[#EDA415] text-white px-5 py-3 rounded-2xl"
          >
            Add Sub Category
          </button>
          <button
            onClick={() => setShowAddProductForm(true)}
            className="bg-[#EDA415] text-white px-5 py-3 rounded-2xl"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Add Category Form */}
      {showAddCategoryForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000a3] z-50">
          <div className="bg-white py-6 px-10 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#3C3C3C] text-center">
              Add Category
            </h2>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full border-2 text-sm border-gray-300 px-4 py-3 rounded-lg my-3"
            />
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleAddCategory}
                className="px-5 py-2 bg-[#EDA415] text-white rounded-md cursor-pointer"
              >
                ADD
              </button>
              <button
                onClick={() => setShowAddCategoryForm(false)}
                className="px-5 py-2 bg-gray-300 rounded-md cursor-pointer"
              >
                DISCARD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Sub Category Form */}
      {showAddSubCategoryForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000a3] z-50">
          <div className="bg-white py-6 px-10 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#3C3C3C] text-center">
              Add Sub Category
            </h2>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border-2 text-sm border-gray-300 px-4 py-3 rounded-lg mt-3 mb-1"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              placeholder="Enter sub category name"
              className="w-full border-2 text-sm border-gray-300 px-4 py-3 rounded-lg mb-3 mt-1"
            />

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleAddSubCategory}
                className="px-5 py-2 bg-[#EDA415] text-white rounded-md cursor-pointer"
              >
                ADD
              </button>
              <button
                onClick={() => setShowAddSubCategoryForm(false)}
                className="px-5 py-2 bg-gray-300 rounded-md cursor-pointer"
              >
                DISCARD
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddProductForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000000a3] z-50 overflow-y-auto">
          <div className="bg-white py-6 px-10 rounded-xl w-[700px] max-h-[90vh] overflow-y-auto shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-[#3C3C3C] text-center">
              Add Product
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
                              if (/^\d*$/.test(value)) {
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
              <div className="flex items-start gap-4">
                <label className="w-1/4 text-sm text-[#3C3C3C73] pt-2">
                  Description :
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  placeholder="Enter description"
                  className="flex-1 border border-gray-300 px-4 py-2 rounded-md text-sm"
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
                  onClick={handleAddProduct}
                  className="bg-[#EDA415] hover:bg-[#d89212] text-white px-6 py-2 rounded-md font-medium"
                >
                  ADD
                </button>
                <button
                  onClick={() => setShowAddProductForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md font-medium"
                >
                  DISCARD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Section */}
      <div className="flex px-20">
        <Sidebar onFiltersChange={handleFiltersChange} />
        <div className="w-full ml-10">
          {/* Show filter results count */}
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {getPaginatedProducts().length} of {totalItems} products
              {activeFilters.subcategoryIds.length > 0 &&
                !activeFilters.all && (
                  <span className="text-[#EDA415] font-medium">
                    {" "}
                    (filtered)
                  </span>
                )}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {getPaginatedProducts().map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {totalItems > 0 && (
            <PaginationComponent
              currentPage={currentPage}
              totalItems={totalItems}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
              onRowsPerPageChange={(value) => {
                setRowsPerPage(value);
                setCurrentPage(1);
              }}
            />
          )}

          {/* Show message when no products match filters */}
          {totalItems === 0 && products.length > 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">
                No products match the selected filters.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your filter selection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
