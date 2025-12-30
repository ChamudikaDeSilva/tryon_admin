"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BrandForm from "@/components/brand/BrandForm";
import { useParams } from "next/navigation";

export default function EditBrandPage() {
  const { id } = useParams();

  return (
    <DefaultLayout>
      <BrandForm brandId={Number(id)} />
    </DefaultLayout>
  );
}
