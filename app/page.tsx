"use client";

import React from 'react';

export default function Home() {
  return (
    <div className="bg-[#faf8f5] min-h-screen text-[#1e1b2e]">
      
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <span className="text-[#0f766e] font-semibold tracking-widest uppercase text-xs mb-4 block">
          Welcome to the academy
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-[#1e1b2e] mb-8 leading-tight">
          The Allied Health & Educator Resource Academy
        </h1>
        <p className="text-lg md:text-xl text-[#6b6880] max-w-2xl mx-auto leading-relaxed mb-12">
          Practical, movement-based strategies to support child self-regulation, 
          reducing the overwhelm of modern classroom and clinical behaviours.
        </p>
      </section>

      {/* Pathway Selection */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Allied Health Pathway */}
          <div className="bg-white p-10 rounded-3xl border border-[#e8e4de] shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-[#f0fdfa] rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">🧠</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Allied Health Assistants</h2>
            <p className="text-[#6b6880] mb-8 leading-relaxed">
              Focused on <strong>Clinical Strategy Delivery</strong>. Access structured milestone 
              trackers and implementation frameworks designed to bridge the gap between 
              professional assessment and daily support.
            </p>
            <a 
              href="/aha-pathway" 
              className="inline-block bg-[#0f766e] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#0d6962] transition"
            >
              Explore AHA Pathway
            </a>
          </div>

          {/* Educator Pathway */}
          <div className="bg-white p-10 rounded-3xl border border-[#e8e4de] shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-[#eef2ff] rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">🌿</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Early Childhood Educators</h2>
            <p className="text-[#6b6880] mb-8 leading-relaxed">
              Focused on <strong>Classroom Regulation Support</strong>. Immediate movement 
              tools to assist with screen-time dysregulation and Thriving Kids 
              requirements without the extra administrative paperwork.
            </p>
            <a 
              href="/educator-pathway" 
              className="inline-block bg-[#3730a3] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#2e288a] transition"
            >
              Explore Educator Pathway
            </a>
          </div>

        </div>
      </section>

      {/* Trust & Methodology Section */}
      <section className="bg-white border-t border-[#e8e4de] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6b6880] mb-6">
            The Methodology
          </h3>
          <p className="text-2xl md:text-3xl font-medium text-[#1e1b2e] leading-snug">
            We simplify complex neurodevelopmental concepts into <span className="text-[#0f766e]">Watch, Practice, Do, and Reflect</span> cycles, empowering you to create sustainable change in the children you support.
          </p>
        </div>
      </section>

    </div>
  );
}