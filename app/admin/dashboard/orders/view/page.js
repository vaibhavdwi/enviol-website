"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ViewOrders() {

  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkStatus, setBulkStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {

    try {

      const res = await fetch("/api/admin/orders/list");
      const data = await res.json();

      setOrders(data.orders || []);

    } catch (err) {

      console.error("Error fetching orders:", err);

    }

  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleSelect = (id) => {

    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );

  };

  const handleBulkUpdate = async () => {

    if (!bulkStatus) {
      alert("Please select a status");
      return;
    }

    if (selectedIds.length === 0) {
      alert("Please select at least one order");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch("/api/admin/orders/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderIds: selectedIds,
          status: bulkStatus
        })
      });

      if (res.ok) {

        alert("Status updated successfully");

        setSelectedIds([]);
        setBulkStatus("");

        fetchOrders();

      } else {

        alert("Failed to update status");

      }

    } catch (error) {

      console.error(error);
      alert("Server error");

    }

    setLoading(false);

  };

  return (

    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        All Orders
      </h2>

      {/* Bulk Controls */}

      <div className="flex gap-4 mb-4">

        <select
          value={bulkStatus}
          onChange={(e) => setBulkStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >

          <option value="">Change Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>

        </select>

        <button
          onClick={handleBulkUpdate}
          disabled={loading}
          className="bg-[#42B3A5] text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Selected"}
        </button>

      </div>

      {/* Orders Table */}

      <div className="bg-white shadow rounded-lg overflow-hidden">

        <div className="grid grid-cols-9 bg-gray-100 text-xs font-semibold px-4 py-3">

          <div></div>
          <div>Order No</div>
          <div>Date</div>
          <div>Company</div>
          <div>Products</div>
          <div>Qty</div>
          <div>Total</div>
          <div>Status</div>
          <div>Invoice</div>

        </div>

        {orders.length === 0 && (

          <p className="px-4 py-4 text-gray-500">
            No orders found.
          </p>

        )}

        {orders.map((order) => (

          <div
            key={order.id}
            className="grid grid-cols-9 px-4 py-3 text-sm border-t items-center"
          >

            {/* Checkbox */}

            <div>

              <input
                type="checkbox"
                checked={selectedIds.includes(order.id)}
                onChange={() => toggleSelect(order.id)}
              />

            </div>

            {/* Order Number */}

            <div>
              {order.order_number}
            </div>

            {/* Date */}

            <div>
              {order.created_at
                ? new Date(order.created_at).toLocaleDateString("en-IN")
                : "-"}
            </div>

            {/* Company */}

            <div>
              {order.company_name}
            </div>

            {/* Products */}

            <div className="text-xs space-y-1">

              {order.products
                ? order.products.split(",").map((p, i) => (
                    <div key={i}>{p}</div>
                  ))
                : "-"}

            </div>

            {/* Quantity */}

            <div className="text-xs space-y-1">

              {order.quantities
                ? order.quantities.split(",").map((q, i) => (
                    <div key={i}>{q}</div>
                  ))
                : "-"}

            </div>

            {/* Total */}

            <div>
              ₹ {Number(order.total_amount).toFixed(2)}
            </div>

            {/* Status */}

            <div>

              <span
                className={`px-2 py-1 rounded text-xs ${
                  order.order_status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : order.order_status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : order.order_status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >

                {order.order_status || "Pending"}

              </span>

            </div>

            {/* Invoice */}

            <div>

              {["In Progress", "Completed"].includes(order.order_status) && (

                <button
                  onClick={() =>
                    router.push(
                      `/admin/dashboard/invoices/generate/${order.id}`
                    )
                  }
                  className="text-green-600 hover:text-green-800 text-lg"
                  title="Generate Invoice"
                >
                  ➜
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}