"use client";

import { useRouter } from "next/navigation";

export default function FGStockHome() {

  const router = useRouter();

  return (

    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Finished Goods Stock
      </h2>

      <div className="flex gap-6">

        <div
          onClick={() => router.push("/admin/dashboard/stock/fg/create")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2">
            Add Stock
          </h3>
          <p className="text-gray-600 text-sm">
            Create new finished goods stock entry.
          </p>
        </div>

        <div
          onClick={() => router.push("/admin/dashboard/stock/fg/view")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2">
            View Stock
          </h3>
          <p className="text-gray-600 text-sm">
            View and manage finished goods inventory.
          </p>
        </div>

      </div>

    </div>

  );

}