"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, CategoryInput } from "@/lib/validation/categorySchema";
import { categoryService } from "@/lib/services/categoryService";

interface Props {
  categoryId?: number;
}

export default function CategoryForm({ categoryId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      is_active: true,
    },
  });

  // 🔄 Load data for Edit
  useEffect(() => {
    if (!categoryId) return;

    const loadCategory = async () => {
      try {
        const data = await categoryService.getById(categoryId);
        reset({
          name: data.name,
          description: data.description,
          is_active: data.is_active ?? true,
        });
      } catch (error) {
        console.error("Failed to load category", error);
      }
    };

    loadCategory();
  }, [categoryId, reset]);

  const onSubmit: SubmitHandler<CategoryInput> = async (data) => {
    try {
      setLoading(true);

      if (categoryId) {
        await categoryService.update(categoryId, data);
        alert("Category updated successfully!");
      } else {
        await categoryService.create(data);
        alert("Category created successfully!");
      }

      router.push("/category");
    } catch (error) {
      console.error("Save failed", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">
        {categoryId ? "Edit Category" : "Add New Category"}
      </h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input {...register("name")} className="w-full border rounded-md p-2" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          {...register("description")}
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* Status */}
      <div className="mb-4 flex items-center gap-2">
        <input type="checkbox" {...register("is_active")} />
        <label className="text-sm font-medium">Active</label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
