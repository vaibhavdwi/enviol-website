"use client";

import { useRouter } from "next/navigation";

export default function StockHome() {

  const router = useRouter();

  return (

    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Stock Management
      </h2>

      <div className="flex gap-6">

        {/* RM Stock */}

        <div
          onClick={() => router.push("/admin/dashboard/stock/rm")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">
            Raw Material Stock
          </h3>
          <p className="text-gray-600 text-sm">
            Manage raw material inventory.
          </p>
        </div>

        {/* FG Stock */}

        <div
          onClick={() => router.push("/admin/dashboard/stock/fg")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">
            Finished Goods Stock
          </h3>
          <p className="text-gray-600 text-sm">
            Manage finished goods inventory.
          </p>
        </div>

      </div>

    </div>

  );

}