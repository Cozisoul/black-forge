// src/components/agency/AgencyContactForm.jsx
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AgencyContactForm() {
  const [status, setStatus] = useState('IDLE'); // IDLE, SUBMITTING, SUCCESS, ERROR

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('SUBMITTING');
    const formData = new FormData(e.target);

    const { error } = await supabase
      .from('agency_leads')
      .insert([
        {
          client_name: formData.get('client_name'),
          brand_name: formData.get('brand_name'),
          project_type: formData.get('project_type'),
          budget_bracket: formData.get('budget_bracket'),
          email: formData.get('email')
        }
      ]);

    if (error) {
      console.error("SYS_ERR:", error);
      setStatus('ERROR');
    } else {
      setStatus('SUCCESS');
      e.target.reset();
    }
  };

  if (status === 'SUCCESS') {
    return (
      <div className="w-full max-w-lg border border-[#050505] p-8 md:p-12 bg-white text-center font-mono flex flex-col items-center">
        <div className="w-12 h-12 md:w-16 md:h-16 border border-[#0044FF] text-[#0044FF] mb-6 md:mb-8 flex items-center justify-center text-2xl md:text-3xl font-bold bg-[#0044FF]/10">
          ✦
        </div>
        <h2 className="text-xl md:text-2xl font-bold uppercase mb-3 md:mb-4 tracking-tight">Brief Received</h2>
        <p className="opacity-80 text-[10px] md:text-xs leading-relaxed mb-6 md:mb-8">
          Your project inquiry has been routed to the Black Forge creative directors. We will review the brief and contact you shortly to initiate proceedings.
        </p>
        <button onClick={() => setStatus('IDLE')} className="border border-[#050505] text-[#050505] px-5 md:px-6 py-2 md:py-3 hover:bg-[#0044FF] hover:text-[#FFF8E7] hover:border-[#0044FF] transition-colors text-xs uppercase tracking-widest">
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="font-mono text-sm space-y-5 md:space-y-6 w-full max-w-lg border border-[#050505] p-5 md:p-12 bg-white shadow-xl shadow-black/5">
      <div className="mb-6 md:mb-8 border-b border-[#050505] pb-3 md:pb-4">
        <h1 className="font-sans font-bold text-2xl md:text-3xl uppercase tracking-tighter">Start a Project</h1>
        <p className="text-[9px] md:text-[10px] uppercase tracking-widest mt-2 opacity-60 text-[#0044FF]">[ INITIATE_INTAKE_PROTOCOL ]</p>
      </div>

      {status === 'ERROR' && (
        <div className="bg-red-500 text-white p-3 md:p-4 text-[10px] md:text-xs text-center uppercase tracking-widest border border-red-500 mb-4 md:mb-6">
          Connection Error: Failed to transmit brief.
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-[10px] uppercase tracking-widest">Client Name *</label>
        <input required type="text" name="client_name" className="w-full bg-transparent border-b border-[#050505] focus:outline-none focus:border-[#0044FF] py-2 transition-colors text-base" />
      </div>
      
      <div className="space-y-2">
        <label className="block text-[10px] uppercase tracking-widest">Brand Name *</label>
        <input required type="text" name="brand_name" className="w-full bg-transparent border-b border-[#050505] focus:outline-none focus:border-[#0044FF] py-2 transition-colors text-base" />
      </div>

      <div className="space-y-2">
        <label className="block text-[10px] uppercase tracking-widest">Contact Email *</label>
        <input required type="email" name="email" className="w-full bg-transparent border-b border-[#050505] focus:outline-none focus:border-[#0044FF] py-2 transition-colors text-base" />
      </div>
      
      <div className="space-y-2">
        <label className="block text-[10px] uppercase tracking-widest">Project Type *</label>
        <select required name="project_type" className="w-full bg-transparent border-b border-[#050505] focus:outline-none focus:border-[#0044FF] py-2 appearance-none transition-colors rounded-none cursor-pointer text-base">
          <option>Campaign</option>
          <option>Scriptwriting</option>
          <option>Brand Identity</option>
          <option>Content Creation</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-[10px] uppercase tracking-widest">Budget Bracket *</label>
        <select required name="budget_bracket" className="w-full bg-transparent border-b border-[#050505] focus:outline-none focus:border-[#0044FF] py-2 appearance-none transition-colors rounded-none cursor-pointer text-base">
          <option>Under R50k</option>
          <option>R50k - R150k</option>
          <option>R150k - R500k</option>
          <option>R500k+</option>
        </select>
      </div>
      
      <button 
        type="submit" 
        disabled={status === 'SUBMITTING'}
        className="w-full bg-[#050505] text-[#FFF8E7] py-3 md:py-4 uppercase font-bold tracking-widest hover:bg-[#0044FF] transition-colors mt-6 md:mt-8 disabled:opacity-50 text-sm"
      >
        {status === 'SUBMITTING' ? 'TRANSMITTING...' : 'Submit Brief'}
      </button>
    </form>
  );
}
