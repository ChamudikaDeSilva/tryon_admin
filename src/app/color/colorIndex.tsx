"use client";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";

import { Eye, Pencil, Trash2 } from "lucide-react";
import Tooltip from "@/components/ui/Tooltip";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { colorService } from "@/lib/services/colorService";
import { Color } from "@/lib/services/colorService";


const ColorPage: React.FC = () => {
  const router = useRouter();
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleAddColor = () => {
    router.push("/color/form");
  };

  const handleViewColor = (id: number) => {
    router.push(`/color/view/${id}`);
  };

  const handleEditColor = (id: number) => {
    router.push(`/color/form/${id}`);
  };

  const handleDeleteColor = (id: number) => {
    setSelectedId(id);
    setModalOpen(true);
  }

  const handleConfirmDelete = async()=>{
    if(!selectedId || selectedId === null) return;
    try {
      await colorService.delete(selectedId);
      setColors((prev) => prev.filter((color)=>color.id !== selectedId));
      setModalOpen(false);
      setSelectedId(null);
    } catch (error) {
      console.error("Failed to delete color", error);
      alert("Delete failed!");
    }
  }

  const handleCancelDelete =()=>{
    setModalOpen(false);
    setSelectedId(null);
  }

  

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const data = await colorService.getAll();
        setColors(data);
      } catch (error) {
        console.error("Failed to fetch colors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  return (
    <DefaultLayout>
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Brands
        </h2>
        <Tooltip text="Add New Category">
          <button
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-primary/90"
            onClick={handleAddColor}
          >
            <span className="text-lg">+</span>
          </button>
        </Tooltip>
      </div>

      {/* Table */}
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <p className="text-center py-6">Loading brands...</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="px-4 py-4">Actions</th>
                  <th className="px-4 py-4">ID</th>
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Color Code</th>
                  <th className="px-4 py-4">Status</th>  
                </tr>
              </thead>
              <tbody>
                {colors.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6">
                      No colors found
                    </td>
                  </tr>
                ) : (
                  colors.map((color) => (
                    <tr key={color.id}>
                      <td className="border-b px-4 py-5">
                        <div className="flex items-center gap-4">
                          
                          {/* View */}
                          <Tooltip text="View Brand">
                            <button className="text-purple-600 hover:text-purple-800" onClick={() => handleViewColor(color.id)}>
                              <Eye size={18} />
                            </button>
                          </Tooltip>

                          {/* Edit */}
                          <Tooltip text="Edit Brand">
                            <button className="text-green-600 hover:text-green-800" onClick={() => handleEditColor(color.id)}>
                              <Pencil size={18} />
                            </button>
                          </Tooltip>

                          {/* Delete */}
                          <Tooltip text="Delete Category">
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDeleteColor(color.id)}
                            >
                              <Trash2 size={18} />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                      <td className="border-b px-4 py-5">
                        {color.id}
                      </td>
                      <td className="border-b px-4 py-5">
                        {color.name}
                      </td>
                      <td className="border-b px-4 py-5">
                        {color.color_code || "Not Available"}
                      </td>
                      <td className="border-b px-4 py-5">
                        <span
                          className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                            color.is_active
                              ? "bg-success text-success"
                              : "bg-danger text-danger"
                          }`}
                        >
                          {color.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={modalOpen}
        title="Delete Color"
        message="Are you sure you want to delete this color?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />

    </DefaultLayout>
  );
};



export default ColorPage;
