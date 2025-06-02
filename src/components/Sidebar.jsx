// import { useEffect, useState } from "react";
// import { MdOutlineArrowForwardIos } from "react-icons/md";
// import serviceApi from "../axios/axios";

// function Sidebar({ onFiltersChange }) {
//   const [categories, setCategories] = useState([]);
//   const [selectedFilters, setSelectedFilters] = useState({
//     all: false,
//     selected: {},
//   });
//   const [openCategories, setOpenCategories] = useState({});

//   // Fetch categories from backend
//   const fetchCategories = async () => {
//     try {
//       const response = await serviceApi.get("/sub-category/get-sub-category");
//       if (response.status === 200) {
//         const grouped = {};

//         response.data.forEach((item) => {
//           const categoryName = item.category.name;
//           if (!grouped[categoryName]) {
//             grouped[categoryName] = [];
//           }
//           grouped[categoryName].push({
//             name: item.name,
//             id: item._id,
//           });
//         });

//         const formattedCategories = Object.keys(grouped).map(
//           (categoryName) => ({
//             name: categoryName,
//             subcategories: grouped[categoryName],
//           })
//         );

//         setCategories(formattedCategories);
//       }
//     } catch (error) {
//       alert("Error occurred");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Notify parent component when filters change
//   useEffect(() => {
//     if (onFiltersChange) {
//       const selectedSubcategoryIds = Object.keys(selectedFilters.selected)
//         .filter((key) => selectedFilters.selected[key])
//         .map((subcategoryName) => {
//           // Find the subcategory ID by name
//           for (const category of categories) {
//             const subcategory = category.subcategories?.find(
//               (sub) => sub.name === subcategoryName
//             );
//             if (subcategory) {
//               return subcategory.id;
//             }
//           }
//           return null;
//         })
//         .filter((id) => id !== null);

//       onFiltersChange({
//         all: selectedFilters.all,
//         subcategoryIds: selectedSubcategoryIds,
//       });
//     }
//   }, [selectedFilters, onFiltersChange, categories]);

//   // Toggle all categories
//   const toggleAll = () => {
//     const isAll = !selectedFilters.all;
//     const newSelected = {};

//     if (isAll) {
//       categories.forEach((cat) =>
//         cat.subcategories?.forEach((sub) => {
//           newSelected[sub.name] = true;
//         })
//       );
//     }

//     setSelectedFilters({ all: isAll, selected: newSelected });
//   };

//   // Toggle individual subcategory
//   const toggleSubcategory = (subName) => {
//     const updatedSelected = {
//       ...selectedFilters.selected,
//       [subName]: !selectedFilters.selected[subName],
//     };

//     const allChecked = categories
//       .flatMap((cat) => cat.subcategories || [])
//       .every((sub) => updatedSelected[sub.name]);

//     setSelectedFilters({
//       all: allChecked,
//       selected: updatedSelected,
//     });
//   };

//   // Toggle category expand/collapse
//   const toggleCategory = (categoryName) => {
//     setOpenCategories((prev) => ({
//       ...prev,
//       [categoryName]: !prev[categoryName],
//     }));
//   };

//   return (
//     <div className="rounded-md w-74">
//       <h2 className="text-[#003F62] font-semibold mb-4">Categories</h2>

//       <div className="mb-4">
//         <button
//           onClick={toggleAll}
//           className="cursor-pointer focus:outline-none"
//           type="button"
//         >
//           {selectedFilters.all ? "Unselect All" : "All Categories"}
//         </button>
//       </div>

//       <div className="space-y-4">
//         {categories.map((category, index) => (
//           <div key={category._id || index}>
//             <div
//               onClick={() => toggleCategory(category.name)}
//               className="cursor-pointer select-none flex justify-between items-center"
//             >
//               <span>{category.name}</span>
//               <MdOutlineArrowForwardIos
//                 className={`transition-transform duration-200 ${
//                   openCategories[category.name] ? "rotate-90" : ""
//                 }`}
//               />
//             </div>

//             {openCategories[category.name] && (
//               <div className="ml-4 mt-3 space-y-2">
//                 {(category.subcategories || []).map((sub, subIndex) => {
//                   const isChecked = !!selectedFilters.selected[sub.name];
//                   return (
//                     <label className="flex items-center gap-2" key={subIndex}>
//                       <input
//                         type="checkbox"
//                         checked={isChecked}
//                         onChange={() => toggleSubcategory(sub.name)}
//                         className="hidden"
//                       />
//                       <span
//                         className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors ${
//                           isChecked ? "bg-[#3F3F3F] text-white" : "bg-[#B3D4E5]"
//                         }`}
//                       >
//                         {isChecked && (
//                           <svg
//                             className="w-3 h-3"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="3"
//                             viewBox="0 0 24 24"
//                           >
//                             <path d="M5 13l4 4L19 7" />
//                           </svg>
//                         )}
//                       </span>
//                       <span className="text-gray-700">{sub.name}</span>
//                     </label>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Sidebar;


import { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import serviceApi from "../axios/axios";

function Sidebar({ onFiltersChange, isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    all: false,
    selected: {},
  });
  const [openCategories, setOpenCategories] = useState({});

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await serviceApi.get("/sub-category/get-sub-category");
      if (response.status === 200) {
        const grouped = {};

        response.data.forEach((item) => {
          const categoryName = item.category.name;
          if (!grouped[categoryName]) {
            grouped[categoryName] = [];
          }
          grouped[categoryName].push({
            name: item.name,
            id: item._id,
          });
        });

        const formattedCategories = Object.keys(grouped).map((name) => ({
          name,
          subcategories: grouped[name],
        }));

        setCategories(formattedCategories);
      }
    } catch (error) {
      alert("Error occurred");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (onFiltersChange) {
      const selectedSubcategoryIds = Object.keys(selectedFilters.selected)
        .filter((key) => selectedFilters.selected[key])
        .map((name) => {
          for (const category of categories) {
            const sub = category.subcategories.find((s) => s.name === name);
            if (sub) return sub.id;
          }
          return null;
        })
        .filter((id) => id !== null);

      onFiltersChange({
        all: selectedFilters.all,
        subcategoryIds: selectedSubcategoryIds,
      });
    }
  }, [selectedFilters, onFiltersChange, categories]);

  const toggleSubcategory = (subName) => {
    const updatedSelected = {
      ...selectedFilters.selected,
      [subName]: !selectedFilters.selected[subName],
    };

    const allChecked = categories
      .flatMap((cat) => cat.subcategories || [])
      .every((sub) => updatedSelected[sub.name]);

    setSelectedFilters({
      all: allChecked,
      selected: updatedSelected,
    });
  };

  const toggleCategory = (name) => {
    setOpenCategories((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-30 transition-opacity lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-1/3 md:w-60 bg-white z-40 p-4 overflow-y-auto transition-transform transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-1"
        }`}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end mb-4">
          <button onClick={onClose}>
            <IoClose className="text-2xl text-gray-700" />
          </button>
        </div>

        {/* Select/Unselect All */}
        <div
          onClick={() => {
            const allSelected = !selectedFilters.all;

            const newSelected = {};
            categories.forEach((cat) => {
              cat.subcategories.forEach((sub) => {
                newSelected[sub.name] = allSelected;
              });
            });

            setSelectedFilters({
              all: allSelected,
              selected: newSelected,
            });
          }}
          className="text-[#003F62] font-semibold cursor-pointer hover:underline mb-4"
        >
          {selectedFilters.all ? "Unselect All Categories" : "Select All Categories"}
        </div>

        {/* Categories list */}
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={category.name + index}>
              <div
                onClick={() => toggleCategory(category.name)}
                className="cursor-pointer select-none flex justify-between items-center"
              >
                <span className="text-[#003F62] font-semibold">{category.name}</span>
                <MdOutlineArrowForwardIos
                  className={`transition-transform duration-200 ${
                    openCategories[category.name] ? "rotate-90" : ""
                  }`}
                />
              </div>

              {openCategories[category.name] && (
                <div className="ml-4 mt-3 space-y-2">
                  {(category.subcategories || []).map((sub, subIndex) => {
                    const isChecked = !!selectedFilters.selected[sub.name];
                    return (
                      <div
                        onClick={() => toggleSubcategory(sub.name)}
                        key={subIndex}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span
                          className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors ${
                            isChecked ? "bg-[#3F3F3F] text-white" : "bg-[#B3D4E5]"
                          }`}
                        >
                          {isChecked && (
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        <span className="text-gray-700">{sub.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
