"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import { categoryService, Category } from "@/lib/services/categoryService";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Tooltip from "@/components/ui/Tooltip";


const CategoryPage: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAddCategory = () => {
    router.push("/category/form");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <DefaultLayout>
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Categories
        </h2>
        <Tooltip text="Add New Category">
          <button
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-primary/90"
            onClick={handleAddCategory}
          >
            <span className="text-lg">+</span>
          </button>
        </Tooltip>
      </div>

      {/* Table */}
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <p className="text-center py-6">Loading categories...</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="px-4 py-4">ID</th>
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td className="border-b px-4 py-5">
                        {category.id}
                      </td>
                      <td className="border-b px-4 py-5">
                        {category.name}
                      </td>
                      <td className="border-b px-4 py-5">
                        <span
                          className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                            category.is_active
                              ? "bg-success text-success"
                              : "bg-danger text-danger"
                          }`}
                        >
                          {category.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="border-b px-4 py-5">
                        <div className="flex items-center gap-4">
                          
                          {/* View */}
                          <Tooltip text="View Category">
                            <button className="text-purple-600 hover:text-primary">
                              <Eye size={18} />
                            </button>
                          </Tooltip>

                          {/* Edit */}
                          <Tooltip text="Edit Category">
                            <button className="text-green-600 hover:text-primary">
                              <Pencil size={18} />
                            </button>
                          </Tooltip>

                          {/* Delete */}
                          <Tooltip text="Delete Category">
                            <button className="text-red-600 hover:text-danger">
                              <Trash2 size={18} />
                            </button>
                          </Tooltip>

                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CategoryPage;
