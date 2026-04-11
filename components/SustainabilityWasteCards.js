"use client";

import { useState } from "react";

export default function SustainabilityWasteCards() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="grid md:grid-cols-3 gap-8">

      {/* Card 1 */}
      <div
        onMouseEnter={() => setActiveCard(1)}
        onMouseLeave={() => setActiveCard(null)}
        className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer
          ${activeCard === 1
            ? "bg-[#42b3a5] text-white shadow-xl scale-105 border-[#42b3a5]"
            : "bg-white hover:shadow-md"}`}
      >
        <h3 className="font-semibold mb-2">Landfill Waste Reduction</h3>
        <p className="text-sm">
          Recycling polymer waste into polyols reduces landfill accumulation.
        </p>
      </div>

      {/* Card 2 */}
      <div
        onMouseEnter={() => setActiveCard(2)}
        onMouseLeave={() => setActiveCard(null)}
        className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer
          ${activeCard === 2
            ? "bg-[#42b3a5] text-white shadow-xl scale-105 border-[#42b3a5]"
            : "bg-white hover:shadow-md"}`}
      >
        <h3 className="font-semibold mb-2">Pollution Reduction</h3>
        <p className="text-sm">
          Prevents burning and reduces air/soil contamination.
        </p>
      </div>

      {/* Card 3 */}
      <div
        onMouseEnter={() => setActiveCard(3)}
        onMouseLeave={() => setActiveCard(null)}
        className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer
          ${activeCard === 3
            ? "bg-[#42b3a5] text-white shadow-xl scale-105 border-[#42b3a5]"
            : "bg-white hover:shadow-md"}`}
      >
        <h3 className="font-semibold mb-2">Carbon Reduction</h3>
        <p className="text-sm">
          Replaces virgin petrochemical feedstocks with recycled alternatives.
        </p>
      </div>

    </div>
  );
}