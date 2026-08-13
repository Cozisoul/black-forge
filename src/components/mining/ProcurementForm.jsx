// src/components/mining/ProcurementForm.jsx
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function ProcurementForm() {
  const [status, setStatus] = useState('IDLE'); // IDLE, TRANSMITTING, CONFIRMED, ERROR

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('TRANSMITTING');
    const formData = new FormData(e.target);

    try {
      const { error } = await supabase
        .from('mining_rfq')
        .insert([
          {
            procurement_officer: formData.get('procurement_officer'),
            mine_site_name: formData.get('mine_site_name'),
            target_shaft: formData.get('target_shaft'),
            equipment_category: formData.get('equipment_category'),
            urgency_level: formData.get('urgency_level'),
            manifest_details: formData.get('manifest_details')
          }
        ]);

      if (error) {
        console.error("SYS_ERR:", error);
        setStatus('ERROR');
      } else {
        setStatus('CONFIRMED');
        e.target.reset();
      }
    } catch (err) {
      console.error("NETWORK_ERR:", err);
      setStatus('ERROR');
    }
  };

  if (status === 'CONFIRMED') {
    return (
      <div className="w-full max-w-4xl mx-auto border border-black bg-black text-white p-6 md:p-12 font-mono uppercase flex flex-col items-center text-center">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FFD700] mb-6 md:mb-8 flex items-center justify-center text-black text-xl md:text-2xl font-bold">✓</div>
        <h2 className="text-xl md:text-2xl mb-3 md:mb-4">Manifest Transmitted</h2>
        <p className="opacity-60 max-w-md text-[10px] md:text-xs leading-relaxed mb-6 md:mb-8">
          The Request for Quote (RFQ) has been logged in the Black Forge dispatch system. Our logistics team will review the manifest and issue a formal quote shortly.
        </p>
        <button onClick={() => setStatus('IDLE')} className="border border-[#FFD700] text-[#FFD700] px-4 md:px-6 py-2 md:py-3 text-xs hover:bg-[#FFD700] hover:text-black transition-colors">
          Return_To_Terminal
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto border border-black bg-white">
      {/* TERMINAL HEADER */}
      <div className="bg-black text-[#FFD700] px-4 md:px-6 py-3 md:py-4 flex justify-between font-mono text-[9px] md:text-[10px] uppercase tracking-widest border-b border-black">
        <span>RFQ_Terminal_v1.0</span>
        <span className="hidden sm:inline">SECURE_PROCUREMENT_LINK</span>
      </div>

      {status === 'ERROR' && (
        <div className="bg-[#FF3333] text-white p-3 md:p-4 font-mono text-[10px] md:text-xs text-center uppercase tracking-widest border-b border-black">
          SYS_ERR: Failed to transmit manifest. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 md:p-12 font-mono text-[11px] md:text-xs uppercase flex flex-col gap-6 md:gap-8">
        
        {/* SECTION 1: ORIGIN DATA */}
        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 border-b border-black/20 pb-6 md:pb-8">
          <legend className="font-sans font-bold text-base md:text-lg mb-4 md:mb-6 tracking-tight">1. Site Origin Data</legend>
          
          <div className="flex flex-col gap-2">
            <label className="opacity-50 text-[10px]">Procurement Officer / Contact</label>
            <input required type="text" name="procurement_officer" className="bg-[#F4F4F4] border border-black p-3 outline-none focus:bg-[#FFD700]/10 focus:border-black transition-colors text-sm" placeholder="SURNAME, INITIAL" />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="opacity-50 text-[10px]">Mine Site / Operation Name</label>
            <input required type="text" name="mine_site_name" className="bg-[#F4F4F4] border border-black p-3 outline-none focus:bg-[#FFD700]/10 focus:border-black transition-colors text-sm" placeholder="e.g., RUSTENBURG PLATINUM" />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="opacity-50 text-[10px]">Target Shaft / Section (Optional)</label>
            <input type="text" name="target_shaft" className="bg-[#F4F4F4] border border-black p-3 outline-none focus:bg-[#FFD700]/10 focus:border-black transition-colors text-sm" placeholder="SHAFT 3 / LEVEL 4" />
          </div>
        </fieldset>

        {/* SECTION 2: MANIFEST SPECIFICATIONS */}
        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 border-b border-black/20 pb-6 md:pb-8">
          <legend className="font-sans font-bold text-base md:text-lg mb-4 md:mb-6 tracking-tight">2. Manifest Specifications</legend>

          <div className="flex flex-col gap-2">
            <label className="opacity-50 text-[10px]">Equipment Category</label>
            <select required name="equipment_category" className="bg-[#F4F4F4] border border-black p-3 outline-none focus:bg-[#FFD700]/10 cursor-pointer appearance-none text-sm">
              <option value="">SELECT_CATEGORY...</option>
              <option value="HAND_TOOLS">Hand Tools & Workshop</option>
              <option value="PPE_SAFETY">PPE & Mine Safety</option>
              <option value="VENTILATION">Ventilation Products</option>
              <option value="HOSES_FLUID">Hoses & Fluid Transfer</option>
              <option value="PUMPS_DEWATERING">Pumps & Dewatering</option>
              <option value="ELECTRICAL">Electrical & Lighting</option>
              <option value="LIFTING_RIGGING">Lifting & Rigging</option>
              <option value="FASTENERS">Fasteners & Consumables</option>
              <option value="MAINTENANCE">Maintenance Support</option>
              <option value="MULTIPLE_MIXED">Multiple / Mixed Manifest</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="opacity-50 text-[#FF3333] font-bold text-[10px]">Urgency Level</label>
            <select required name="urgency_level" className="bg-[#F4F4F4] border border-black p-3 outline-none focus:bg-[#FFD700]/10 cursor-pointer appearance-none text-[#FF3333] font-bold text-sm">
              <option value="ROUTINE">ROUTINE STOCK</option>
              <option value="PRIORITY">PRIORITY MAINTENANCE</option>
              <option value="CRITICAL_BREAKDOWN">CRITICAL BREAKDOWN</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="opacity-50 text-[10px]">Manifest Details / Part Numbers</label>
            <textarea required name="manifest_details" rows="5" className="bg-[#F4F4F4] border border-black p-3 outline-none focus:bg-[#FFD700]/10 focus:border-black transition-colors resize-none leading-relaxed text-sm" placeholder="ENTER QUANTITIES, PART NUMBERS, AND SPECIFICATIONS HERE..."></textarea>
          </div>
        </fieldset>

        {/* SUBMIT PROTOCOL */}
        <div className="pt-2 md:pt-4">
          <button 
            type="submit" 
            disabled={status === 'TRANSMITTING'}
            className="w-full bg-black text-[#FFD700] font-sans font-bold text-base md:text-xl uppercase py-4 md:py-5 hover:bg-[#FFD700] hover:text-black border border-black transition-colors disabled:opacity-50 flex items-center justify-center gap-4"
          >
            {status === 'TRANSMITTING' ? (
              <span className="animate-pulse">Transmitting...</span>
            ) : (
              <>Transmit Manifest [ → ]</>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
