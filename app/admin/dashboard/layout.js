"use client";

import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // ✅ get current path for active link

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/admin/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const sidebarLinks = [
    { name: "Enquiries", path: "/admin/dashboard" },
    { name: "Orders", path: "/admin/dashboard/orders" },
    { name: "Invoices", path: "/admin/dashboard/orders" },
    { name: "Quotation", path: "/admin/dashboard/quotation" },
    { name: "Purchase", path: "/admin/dashboard/purchase" },
    { name: "Stock", path: "/admin/dashboard/stock" },
    { name: "BOM", path: "/admin/dashboard/bom" },
    { name: "Sales", path: "/admin/dashboard/sales" },
    { name: "Accounting", path: "/admin/dashboard/accounting" },
  ];

  return (
    <div className="flex min-h-screen bg-yellow-50">
      {/* Sidebar */}
      <div className="w-64 bg-[#1F524F] text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

          <ul className="space-y-2">
            {sidebarLinks.map((link) => {
              const isSelected = pathname === link.path; // ✅ active link highlight
              return (
                <li
                  key={link.path}
                  onClick={() => router.push(link.path)}
                  className={`cursor-pointer px-3 py-2 rounded transition-colors duration-200
                    ${isSelected ? "bg-[#42B3A5]" : "hover:bg-[#42B3A5]"} 
                    text-white font-medium`}
                >
                  {link.name}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-8 bg-white text-[#1F524F] px-4 py-2 rounded font-semibold hover:opacity-90"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}