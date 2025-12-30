"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams, useRouter } from "next/navigation";
import { categoryService, Category } from "@/lib/services/categoryService";
import { ArrowLeft } from "lucide-react";

export default function CategoryViewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      try {
        const data = await categoryService.getById(Number(id));
        setCategory(data);
      } catch (error) {
        console.error("Failed to fetch category", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  return (
    <DefaultLayout>
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-primary"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-xl font-semibold">View Category</h2>
        </div>

        {/* Content */}
        {loading ? (
          <p>Loading category...</p>
        ) : !category ? (
          <p className="text-red-500">Category not found</p>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">ID</p>
              <p className="font-medium">{category.id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{category.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="font-medium">
                {category.description || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                  category.is_active
                    ? "bg-success/10 text-success"
                    : "bg-danger/10 text-danger"
                }`}
              >
                {category.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
