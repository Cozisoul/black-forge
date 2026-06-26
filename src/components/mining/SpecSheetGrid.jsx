// src/components/mining/SpecSheetGrid.jsx
import React from 'react';

const inventoryCategories = [
  { id: "01", title: "Hand Tools & Workshop", desc: "Heavy-duty spanners, torque wrenches, and workshop infrastructure." },
  { id: "02", title: "PPE & Mine Safety", desc: "Hard hats, cap lamps, high-vis, and compliant respiratory gear." },
  { id: "03", title: "Ventilation Products", desc: "Ducting, extraction fans, and airflow management systems." },
  { id: "04", title: "Hoses & Fluid Transfer", desc: "High-pressure slurry hoses, fittings, and hydraulic lines." },
  { id: "05", title: "Pumps & Dewatering", desc: "Submersible pumps and critical flood-management equipment." },
  { id: "06", title: "Electrical & Lighting", desc: "Intrinsically safe cabling, junction boxes, and shaft lighting." },
  { id: "07", title: "Lifting & Rigging", desc: "Certified chain blocks, lever hoists, and heavy handling gear." },
  { id: "08", title: "Fasteners & Hardware", desc: "Rock bolts, industrial anchors, and daily operational consumables." },
  { id: "09", title: "Maintenance & Support", desc: "Lubricants, sealants, and site store replenishment stock." }
];

export default function SpecSheetGrid() {
  return (
    <section className="w-full border-b border-black">
      
      {/* GRID HEADER */}
      <div className="bg-black text-white px-4 md:px-6 py-3 flex justify-between font-mono text-[9px] md:text-[10px] uppercase">
        <span>Inventory_Ledger</span>
        <span className="text-[#FFD700]">STATUS: ACTIVE</span>
      </div>

      {/* THE BRUTALIST GRID: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {inventoryCategories.map((cat, index) => (
          <div 
            key={cat.id} 
            className={`
              flex flex-col p-5 md:p-8 group cursor-crosshair transition-colors duration-200
              hover:bg-[#FFD700]
              border-b border-black
              sm:border-r border-black
              ${index % 2 === 0 ? 'sm:border-r' : 'sm:border-r-0'}
              ${index % 3 !== 2 ? 'lg:border-r' : 'lg:border-r-0'}
              last:border-b-0
            `}
          >
            {/* Spec Number */}
            <div className="font-mono text-3xl md:text-4xl font-bold mb-4 md:mb-8 opacity-20 group-hover:opacity-100 transition-opacity">
              [{cat.id}]
            </div>
            
            {/* Category Title */}
            <h3 className="font-sans font-bold text-lg md:text-xl uppercase leading-tight mb-2 md:mb-4 group-hover:text-black">
              {cat.title}
            </h3>
            
            {/* Technical Description */}
            <p className="font-mono text-[10px] md:text-[11px] leading-relaxed opacity-60 group-hover:opacity-100 mb-4 md:mb-8 flex-1">
              {cat.desc}
            </p>

            {/* Action Call */}
            <div className="mt-auto pt-3 md:pt-4 border-t border-black/20 font-mono text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 flex justify-between">
              <span>View_Specs</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
