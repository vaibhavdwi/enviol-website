"use client";

import { useRouter } from "next/navigation";

export default function OrdersHome() {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Orders Management
      </h2>

      <div className="flex gap-6">

        <div
          onClick={() => router.push("/admin/dashboard/orders/create")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">Create Order</h3>
          <p className="text-gray-600 text-sm">
            Generate a new order and save to database.
          </p>
        </div>

        <div
          onClick={() => router.push("/admin/dashboard/orders/view")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">View Orders</h3>
          <p className="text-gray-600 text-sm">
            See all created orders and manage them.
          </p>
        </div>

      </div>
    </div>
  );
}