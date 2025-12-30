"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Brand, brandService } from "@/lib/services/brandService";

export default function BrandViewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBrand = async () => {
      try {
        const data = await brandService.getById(Number(id));
        setBrand(data);
      } catch (error) {
        console.error("Failed to fetch brand", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
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
          <h2 className="text-xl font-semibold">View Brand</h2>
        </div>

        {/* Content */}
        {loading ? (
          <p>Loading brand...</p>
        ) : !brand ? (
          <p className="text-red-500">Brand not found</p>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">ID</p>
              <p className="font-medium">{brand.id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{brand.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="font-medium">
                {brand.description || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                  brand.is_active
                    ? "bg-success/10 text-success"
                    : "bg-danger/10 text-danger"
                }`}
              >
                {brand.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
