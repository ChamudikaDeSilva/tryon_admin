"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

import ColorForm from "@/components/color/ColorForm";
import { useParams } from "next/navigation";

export default function EditColorPage() {
  const { id } = useParams();

  return (
    <DefaultLayout>
      <ColorForm colorId={Number(id)} />
    </DefaultLayout>
  );
}
