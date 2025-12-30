"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandSchema, BrandInput } from "@/lib/validation/brandSchema";
import { brandService } from "@/lib/services/brandService";

interface Props {
  brandId?: number;
}

export default function BrandForm({ brandId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandInput>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      is_active: true,
    },
  });

  // 🔄 Load data for Edit
  useEffect(() => {
    if (!brandId) return;

    const loadBrand = async () => {
      try {
        const data = await brandService.getById(brandId);
        reset({
          name: data.name,
          description: data.description,
          is_active: data.is_active ?? true,
        });
      } catch (error) {
        console.error("Failed to load category", error);
      }
    };

    loadBrand();
  }, [brandId, reset]);

  const onSubmit: SubmitHandler<BrandInput> = async (data) => {
    try {
      setLoading(true);

      if (brandId) {
        await brandService.update(brandId, data);
        alert("Brand updated successfully!");
      } else {
        await brandService.create(data);
        alert("Brand created successfully!");
      }

      router.push("/brand");
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
        {brandId ? "Edit Brand" : "Add New Brand"}
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
