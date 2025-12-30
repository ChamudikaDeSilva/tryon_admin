"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CategoryForm from "@/components/category/CategoryForm";
import { useParams } from "next/navigation";

export default function EditCategoryPage() {
  const { id } = useParams();

  return (
    <DefaultLayout>
      <CategoryForm categoryId={Number(id)} />
    </DefaultLayout>
  );
}
