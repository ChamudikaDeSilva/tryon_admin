"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, CategoryInput } from "@/lib/validation/categorySchema";
import { categoryService } from "@/lib/services/categoryService";

export default function CategoryForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // useForm with proper typing and default values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      status: "active", // default value for select
    },
  });

  // Submit handler with proper type
  const onSubmit: SubmitHandler<CategoryInput> = async (data) => {
    try {
      setLoading(true);
      await categoryService.create(data);
      alert("Category created successfully!"); // replace with toast in production
      router.push("/categories");
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Category</h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          {...register("name")}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          {...register("description")}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          {...register("status")}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
      >
        {loading ? "Saving..." : "Save Category"}
      </button>
    </form>
  );
}
