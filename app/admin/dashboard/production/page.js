"use client";

import { useRouter } from "next/navigation";

export default function ProductionHome() {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Production Management
      </h2>

      <div className="flex gap-6">

        {/* Create Batch */}
        <div
          onClick={() => router.push("/admin/dashboard/production/create")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">Create Batch</h3>
          <p className="text-gray-600 text-sm">
            Create a new production batch and assign job cards.
          </p>
        </div>

        {/* View Batches */}
        <div
          onClick={() => router.push("/admin/dashboard/production/view")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">View Batches</h3>
          <p className="text-gray-600 text-sm">
            View and manage all production batches.
          </p>
        </div>

      </div>
    </div>
  );
}