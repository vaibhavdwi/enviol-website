"use client";

import { useRouter } from "next/navigation";

export default function PurchaseHome() {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Purchase Management
      </h2>

      <div className="flex gap-6">

        {/* Create Purchase Order */}
        <div
          onClick={() => router.push("/admin/dashboard/purchase/create")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">
            Create Purchase Order
          </h3>
          <p className="text-gray-600 text-sm">
            Generate a new purchase order for suppliers.
          </p>
        </div>

        {/* View Purchase Orders */}
        <div
          onClick={() => router.push("/admin/dashboard/purchase/view")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">
            View Purchase Orders
          </h3>
          <p className="text-gray-600 text-sm">
            See all purchase orders and update their status.
          </p>
        </div>

      </div>
    </div>
  );
}