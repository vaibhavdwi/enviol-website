"use client";

import { useRouter } from "next/navigation";

export default function AccountingHome() {
  const router = useRouter();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#42B3A5]">Accounting Module</h1>

      <div className="space-y-4 max-w-sm">
        <button
          onClick={() => router.push("/admin/dashboard/accounting/create")}
          className="bg-green-500 text-white px-6 py-3 rounded w-full"
        >
          Add Expense
        </button>

        <button
          onClick={() => router.push("/admin/dashboard/accounting/view")}
          className="bg-blue-500 text-white px-6 py-3 rounded w-full"
        >
          View Monthly Accounting
        </button>
      </div>
    </div>
  );
}