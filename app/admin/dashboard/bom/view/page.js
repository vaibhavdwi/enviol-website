"use client";

import { useState, useEffect } from "react";

export default function ViewBOM() {

  const [products,setProducts] = useState([]);

  const [productId,setProductId] = useState("");
  const [productName,setProductName] = useState("");
  const [bomItems,setBomItems] = useState([]);

  const [batchSize,setBatchSize] = useState("");
  const [batchDate,setBatchDate] = useState("");
  const [batchTime,setBatchTime] = useState("");
  const [operator,setOperator] = useState("");

  // ---------------- Load Products ----------------

  useEffect(()=>{

    fetch("/api/admin/bom/products")
      .then(res=>res.json())
      .then(data=>{

        setProducts(data.products || []);

      });

  },[]);

  // ---------------- Load BOM ----------------

  const loadBOM = async(id)=>{

    setProductId(id);

    const product = products.find(p=>p.product_id===id);

    setProductName(product?.product_name || "");

    const res = await fetch(`/api/admin/bom/get?product_id=${id}`);

    const data = await res.json();

    setBomItems(data.items || []);
  };

  // ---------------- Update Item (UI Only) ----------------

  const updateItem = (index,field,value)=>{

    const updated=[...bomItems];

    updated[index][field]=value;

    setBomItems(updated);

  };

  // ---------------- Generate Job Card ----------------

  const generateJobCard = async () => {

    if(!batchSize || !batchDate || !batchTime || !operator){

      alert("Please fill all batch details");

      return;
    }

    const payload={

      product_id:productId,
      product_name:productName,
      batch_size:batchSize,
      batch_date:batchDate,
      batch_time:batchTime,
      operator,
      bomItems

    };

    const res = await fetch("/api/admin/bom/job-card", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(payload),

    });

    if (!res.ok) {

      const error = await res.json();

      alert(
        error.message +
        (error.items ? "\n\n" + error.items.join("\n") : "")
      );

      return;

    }

    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download=`job-card_${batchDate}_${batchTime}.pdf`;

    a.click();

  };

  return(

    <div>

      <h2 className="text-2xl font-bold text-[#42B3A5] mb-6">
        BOM & Job Card
      </h2>

      {/* PRODUCT SELECT */}

      <select
        onChange={(e)=>loadBOM(e.target.value)}
        className="border p-3 rounded mb-6"
      >

        <option value="">Select Product</option>

        {products.map(p=>(

          <option key={p.product_id} value={p.product_id}>

            {p.product_name}

          </option>

        ))}

      </select>


      {/* BOM TABLE */}

      {bomItems.length>0 &&(

        <div className="bg-white shadow rounded mb-6">

          <div className="grid grid-cols-3 bg-gray-100 font-semibold p-3">

            <div>Raw Material</div>
            <div>Ratio %</div>
            <div>Unit</div>

          </div>

          {bomItems.map((item,index)=>(

            <div key={index} className="grid grid-cols-3 p-3 border-t">

              <input
                value={item.rm_item_name}
                onChange={(e)=>updateItem(index,"rm_item_name",e.target.value)}
                className="border p-2 rounded"
              />

              <input
                type="number"
                value={item.ratio_percent}
                onChange={(e)=>updateItem(index,"ratio_percent",e.target.value)}
                className="border p-2 rounded"
              />

              <div className="flex items-center">
                {item.unit}
              </div>

            </div>

          ))}

        </div>

      )}


      {/* JOB CARD FORM */}

      {bomItems.length>0 &&(

        <div className="bg-white shadow p-6 rounded space-y-4 max-w-lg">

          <h3 className="text-lg font-semibold">
            Generate Job Card
          </h3>

          <input
            type="number"
            placeholder="Batch Size (Kg)"
            value={batchSize}
            onChange={(e)=>setBatchSize(e.target.value)}
            className="border p-3 rounded w-full"
          />

          <input
            type="date"
            value={batchDate}
            onChange={(e)=>setBatchDate(e.target.value)}
            className="border p-3 rounded w-full"
          />

          <input
            type="time"
            value={batchTime}
            onChange={(e)=>setBatchTime(e.target.value)}
            className="border p-3 rounded w-full"
          />

          <input
            placeholder="Operator Name"
            value={operator}
            onChange={(e)=>setOperator(e.target.value)}
            className="border p-3 rounded w-full"
          />

          <button
            onClick={generateJobCard}
            className="bg-[#42B3A5] text-white px-6 py-3 rounded hover:opacity-90"
          >
            Generate Job Card
          </button>

        </div>

      )}

    </div>
  );
}