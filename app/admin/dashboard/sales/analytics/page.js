"use client";

import { useEffect, useState } from "react";

export default function SalesAnalytics() {

  const [data,setData] = useState(null);
  const [from,setFrom] = useState("");
  const [to,setTo] = useState("");

  const loadData = async () => {

    let url="/api/admin/sales/analytics";

    if(from && to){
      url+=`?from=${from}&to=${to}`;
    }

    const res = await fetch(url);
    const json = await res.json();

    setData(json);

  };

  useEffect(()=>{
    loadData();
  },[]);

  return(

    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        Sales Analytics
      </h2>

      {/* Date Filter */}

      <div className="flex gap-3 mb-6">

        <input
          type="date"
          value={from}
          onChange={(e)=>setFrom(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={to}
          onChange={(e)=>setTo(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={loadData}
          className="bg-[#42B3A5] text-white px-4 py-2 rounded"
        >
          Apply
        </button>

      </div>

      {!data && <p>Loading...</p>}

      {data && (

        <div className="space-y-10">

          {/* Monthly Revenue */}

          <div className="bg-white p-6 rounded shadow">

            <h3 className="text-lg font-semibold mb-4">
              Monthly Revenue
            </h3>

            {data.monthly.map((m,i)=>(
              <div key={i} className="flex justify-between border-b py-2">
                <span>{m.month}</span>
                <span>₹ {m.revenue}</span>
              </div>
            ))}

          </div>


          {/* Sales by Product */}

          <div className="bg-white p-6 rounded shadow">

            <h3 className="text-lg font-semibold mb-4">
              Sales by Product
            </h3>

            {data.products.map((p,i)=>(
              <div key={i} className="flex justify-between border-b py-2">
                <span>{p.product_name}</span>
                <span>{p.qty_sold}</span>
              </div>
            ))}

          </div>


          {/* Sales by State */}

          <div className="bg-white p-6 rounded shadow">

            <h3 className="text-lg font-semibold mb-4">
              Sales by State
            </h3>

            {data.states.map((s,i)=>(
              <div key={i} className="flex justify-between border-b py-2">
                <span>{s.state}</span>
                <span>₹ {s.revenue}</span>
              </div>
            ))}

          </div>


          {/* Top Customers */}

          <div className="bg-white p-6 rounded shadow">

            <h3 className="text-lg font-semibold mb-4">
              Top Customers
            </h3>

            {data.customers.map((c,i)=>(
              <div key={i} className="flex justify-between border-b py-2">
                <span>{c.company_name}</span>
                <span>₹ {c.revenue}</span>
              </div>
            ))}

          </div>

        </div>

      )}

    </div>

  );

}