"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function GenerateInvoice() {
  const params = useParams();
  const orderId = params?.orderId;
  console.log("OrderId from params:", orderId);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/admin/orders/${orderId}`);
        const data = await res.json();

        if (res.ok) {
          setOrder(data.order);
        } else {
          console.error("API error:", data.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="p-8">Loading invoice...</p>;

  if (!order) return <p className="p-8">Order not found.</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Generate Invoice
      </h2>

      <div className="bg-white shadow rounded-lg p-8 mb-6">
        <h3 className="text-xl font-bold mb-2">
          ENVIOL POLYTECH SOLUTIONS
        </h3>
        <p>GSTIN: 2349823472374</p>

        <hr className="my-4" />

        <p><strong>Company:</strong> {order.company_name}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>City:</strong> {order.city}</p>

        <hr className="my-4" />

        <p><strong>Product:</strong> {order.product_name}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Total:</strong> Rs. {order.total_amount}</p>
      </div>

      <a
        href={`/api/admin/invoices/download/${orderId}`}
        className="bg-[#42B3A5] text-white px-6 py-2 rounded"
      >
        Download PDF
      </a>
    </div>
  );
}