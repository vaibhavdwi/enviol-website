"use client";

import { useRouter } from "next/navigation";

export default function BomHome() {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        BOM Management
      </h2>

      <div className="flex gap-6">

        <div
          onClick={() => router.push("/admin/dashboard/bom/create")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">Create BOM</h3>
          <p className="text-gray-600 text-sm">
            Create Bill of Materials for products.
          </p>
        </div>

        <div
          onClick={() => router.push("/admin/dashboard/bom/view")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">View BOM</h3>
          <p className="text-gray-600 text-sm">
            View and print job cards for products.
          </p>
        </div>

      </div>
    </div>
  );
}