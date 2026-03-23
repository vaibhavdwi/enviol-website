"use client";

import { useRouter } from "next/navigation";

export default function QuotationHome() {

  const router = useRouter();

  return (

    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Quotation Management
      </h2>

      <div className="flex gap-6">

        {/* RM Quotation */}

        <div
          onClick={() => router.push("/admin/dashboard/quotation/create")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">
            Create Order Quotation
          </h3>
          <p className="text-gray-600 text-sm">
            Create Quotation and generate pdf.
          </p>
        </div>

        {/* FG Quotation */}

        <div
          onClick={() => router.push("/admin/dashboard/quotation/view")}
          className="cursor-pointer bg-white shadow rounded-lg p-6 w-64 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">
            View sent Quotation
          </h3>
          <p className="text-gray-600 text-sm">
            Tracks sent quotation history.
          </p>
        </div>

      </div>

    </div>

  );

}