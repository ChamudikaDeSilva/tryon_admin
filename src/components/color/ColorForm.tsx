"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { colorSchema, ColorInput } from "@/lib/validation/colorSchema";
import { colorService } from "@/lib/services/colorService";

interface Props {
  colorId?: number;
}

export default function ColorForm({ colorId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ColorInput>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      is_active: true,
    },
  });

  // 🔄 Load data for Edit
  useEffect(() => {
    if (!colorId) return;

    const loadColor = async () => {
      try {
        const data = await colorService.getById(colorId);
        reset({
            name: data.name,
            color_code: data.color_code,
            is_active: data.is_active ?? true,      
        });
      } catch (error) {
        console.error("Failed to load category", error);
      }
    };

    loadColor();
  }, [colorId, reset]);

  const onSubmit: SubmitHandler<ColorInput> = async (data) => {
    try {
      setLoading(true);

      if (colorId) {
        await colorService.update(colorId, data);
        alert("Color updated successfully!");
      } else {
        await colorService.create(data);
        alert("Color created successfully!");
      }

      router.push("/color");
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
        {colorId ? "Edit Color" : "Add New Color"}
      </h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input {...register("name")} className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      {/* Color Code */}
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Color Code</label>
            <input {...register("color_code")} className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
            {errors.color_code && (
            <p className="text-red-500 text-sm">{errors.color_code.message}</p>
            )}
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
