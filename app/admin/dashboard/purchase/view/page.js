"use client";

import { useEffect, useState } from "react";

export default function ViewPurchases() {

  const [purchases, setPurchases] = useState([]);

  // Fetch purchases
  const fetchPurchases = async () => {

    try {

      const res = await fetch("/api/admin/purchase/list");
      const data = await res.json();

      setPurchases(data.purchases || []);

    } catch (error) {
      console.error("Error fetching purchases:", error);
    }

  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  // Update Status
  const updateStatus = async (id, status) => {

    await fetch("/api/admin/purchase/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, status })
    });

    fetchPurchases();

  };

  // Update Final Amount
  const updateFinalAmount = async (id, amount) => {

    await fetch("/api/admin/purchase/update-amount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, amount })
    });

    fetchPurchases();

  };

  return (

    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        View Purchase Orders
      </h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">

        {/* Header */}

        <div className="grid grid-cols-8 bg-gray-100 text-xs font-semibold px-4 py-3">

          <div>PO No</div>
          <div>Supplier</div>
          <div>Products</div>
          <div>Total</div>
          <div>Final Amount</div>
          <div>Status</div>
          <div>Date</div>
          <div>PO</div>

        </div>

        {purchases.length === 0 && (

          <p className="px-4 py-4 text-gray-500">
            No purchases found.
          </p>

        )}

        {purchases.map((purchase) => (

          <div
            key={purchase.id}
            className="grid grid-cols-8 px-4 py-3 text-sm border-t items-center"
          >

            {/* PO Number */}

            <div>
              {purchase.purchase_number}
            </div>

            {/* Supplier */}

            <div>
              {purchase.supplier_name}
            </div>

            {/* Products */}

            <div>

              {purchase.items?.map((item, index) => (

                <div key={index}>
                  {item.product_name} ({item.quantity})
                </div>

              ))}

            </div>

            {/* Total */}

            <div>
              ₹ {purchase.total_amount}
            </div>

            {/* Final Amount */}

            <div>

              <input
                type="number"
                defaultValue={purchase.final_amount || ""}
                className="border rounded px-2 py-1 w-24"
                onBlur={(e) =>
                  updateFinalAmount(
                    purchase.id,
                    e.target.value
                  )
                }
              />

            </div>

            {/* Status */}

            <div>

              <select
                value={purchase.status || "Pending"}
                onChange={(e) =>
                  updateStatus(
                    purchase.id,
                    e.target.value
                  )
                }
                className="border rounded px-2 py-1"
              >

                <option value="Pending">Pending</option>
                <option value="Ordered">Ordered</option>
                <option value="Received">Received</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>

              </select>

            </div>

            {/* Date */}

            <div>
              {new Date(purchase.created_at).toLocaleDateString()}
            </div>

            {/* Download PO */}

            <div>

              <a
                href={`/api/admin/purchase/download/${purchase.id}`}
                className="text-green-600 hover:text-green-800 text-lg"
                title="Download PO"
              >
                ⬇
              </a>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}