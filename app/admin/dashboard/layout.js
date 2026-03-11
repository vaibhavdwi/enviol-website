"use client";

import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      // Force reload so middleware re-checks token
      window.location.href = "/admin/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-yellow-50">

      {/* Sidebar */}
      <div className="w-64 bg-[#42B3A5] text-white p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

          <ul className="space-y-4">
            <li
              className="cursor-pointer hover:opacity-100"
              onClick={() => router.push("/admin/dashboard")}
            >
              Enquiries
            </li>

            <li
              className="cursor-pointer hover:opacity-100"
              onClick={() => router.push("/admin/dashboard/orders")}
            >
              Orders
            </li>

            <li
              className="cursor-pointer hover:opacity-100"
              onClick={() => router.push("/admin/dashboard/invoices")}
            >
              Invoices
            </li>
			<li
              className="cursor-pointer hover:opacity-100"
              onClick={() => router.push("/admin/dashboard/quotation")}
            >
              Quotation
            </li>
			<li
              className="cursor-pointer hover:opacity-100"
              onClick={() => router.push("/admin/dashboard/purchase")}
            >
              Purchase
            </li>
			<li
              className="cursor-pointer hover:opacity-100"
              onClick={() => router.push("/admin/dashboard/stock")}
            >
              Stock
            </li>
			<li
              className="cursor-pointer hover:opacity-100"
              onClick={() => router.push("/admin/dashboard/bom")}
            >
              BOM
            </li>
			<li
              className="cursor-pointer hover:opacity-100"
              onClick={() => router.push("/admin/dashboard/sales")}
            >
              Sales
            </li>
			<li
              className="cursor-pointer hover:opacity-100"
              onClick={() => router.push("/admin/dashboard/accounting")}
            >
              Accounting
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-8 bg-white text-[#42B3A5] px-4 py-2 rounded font-semibold hover:opacity-90"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}