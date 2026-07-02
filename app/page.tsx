"use client";

import React, { useState } from 'react';

export default function Home() {
  // Track active steps in the topic timeline
  const [activeStep, setActiveStep] = useState('watch');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col justify-between">
      
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 tracking-tight text-lg">
              Play Move Improve
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium text-sm">
              Spectrum Village Academy
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="#allied-health" className="text-teal-700 hover:text-teal-800 border-b-2 border-teal-600 pb-1 pt-0.5">
              Allied Health
            </a>
            <a href="#educator" className="text-slate-600 hover:text-slate-800 pb-1 pt-0.5">
              Educator
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-8 flex-grow w-full">
        
        {/* Breadcrumb Path */}
        <nav className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
          <span>Module 1: Foundations</span>
          <span>/</span>
          <span className="text-slate-600">Topic 2</span>
        </nav>

        {/* Dynamic Learning Phase Progress Stepper */}
        <section className="bg-white rounded-2xl border border-slate-100 p-4 md:p-6 shadow-xs mb-8">
          <div className="grid grid-cols-4 gap-2 relative">
            
            {/* Step 1: Watch */}
            <button 
              onClick={() => setActiveStep('watch')}
              className={`flex flex-col items-center text-center p-3 rounded-xl transition ${
                activeStep === 'watch' 
                  ? 'bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-600/20' 
                  : 'hover:bg-slate-50 text-slate-500 font-medium'
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs mb-2 font-bold ${
                activeStep === 'watch' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}>1</span>
              <span className="text-xs md:text-sm">Watch</span>
            </button>

            {/* Step 2: Practice */}
            <button 
              onClick={() => setActiveStep('practice')}
              className={`flex flex-col items-center text-center p-3 rounded-xl transition ${
                activeStep === 'practice' 
                  ? 'bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-600/20' 
                  : 'hover:bg-slate-50 text-slate-500 font-medium'
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs mb-2 font-bold ${
                activeStep === 'practice' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}>2</span>
              <span className="text-xs md:text-sm">Practice</span>
            </button>

            {/* Step 3: Do */}
            <button 
              onClick={() => setActiveStep('do')}
              className={`flex flex-col items-center text-center p-3 rounded-xl transition ${
                activeStep === 'do' 
                  ? 'bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-600/20' 
                  : 'hover:bg-slate-50 text-slate-500 font-medium'
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs mb-2 font-bold ${
                activeStep === 'do' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}>3</span>
              <span className="text-xs md:text-sm">Do</span>
            </button>

            {/* Step 4: Reflect */}
            <button 
              onClick={() => setActiveStep('reflect')}
              className={`flex flex-col items-center text-center p-3 rounded-xl transition ${
                activeStep === 'reflect' 
                  ? 'bg-teal-50 text-teal-900 font-bold ring-1 ring-teal-600/20' 
                  : 'hover:bg-slate-50 text-slate-500 font-medium'
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs mb-2 font-bold ${
                activeStep === 'reflect' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}>4</span>
              <span className="text-xs md:text-sm">Reflect</span>
            </button>

          </div>
        </section>

        {/* Primary Topic Heading */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2">
            Working within the allied health team
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Understanding lines of reporting, roles, and maintaining highly effective professional connections.
          </p>
        </header>

        {/* Free Starter Content: Core Resource Cards */}
        <section className="grid md:grid-cols-2 gap-6 mb-12">
          
          {/* Card 1: Team Structures */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md mb-3">
                Free Document Guide
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                Who is on your allied health team
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                A clear breakdown mapping out the core differences between Occupational Therapists, Physiotherapists, Speech Pathologists, and Developmental Educators.
              </p>
            </div>
            <button className="w-full sm:w-auto bg-slate-900 text-white font-medium text-sm py-2.5 px-4 rounded-xl hover:bg-slate-800 transition text-center">
              Download Framework Guide (PDF)
            </button>
          </div>

          {/* Card 2: Quick Communication Reference */}
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md mb-3">
                Free Strategy Card
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                Communication with your AHP quick card
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Practical, clinical reporting scripts to streamline handover details during brief checks with your supervising Allied Health Professionals.
              </p>
            </div>
            <button className="w-full sm:w-auto bg-slate-900 text-white font-medium text-sm py-2.5 px-4 rounded-xl hover:bg-slate-800 transition text-center">
              Open Strategy Card
            </button>
          </div>

        </section>

        {/* Interactive Tool Section (AHA Only Area) */}
        <section className="bg-white rounded-2xl shadow-xs border border-slate-100 p-6 md:p-8 mb-12">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block mb-1">
              Try it yourself
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
              Who Do I Go To?
            </h2>
            <p className="text-sm text-slate-600">
              Use this digital tool to process clinical triage paths and verify when to escalate common childhood presentation hurdles.
            </p>
          </div>

          {/* Embedded Application Frame */}
          <div className="w-full rounded-xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-50 h-[500px]">
            <iframe 
              src="https://allied-health-assistant-course.netlify.app/" 
              title="Who Do I Go To? Interactive Clinical Tool"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* Experiential Application Blocks */}
        <section className="bg-slate-900 text-slate-100 rounded-2xl p-6 md:p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-teal-500/20 text-teal-300 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-teal-500/30">
              Hands-on activity
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Professional check-in workflow
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-2xl">
            Run a structured check-in with your supervising AHP, then fill in your communication plan.
          </p>
          <button className="bg-white text-slate-900 font-semibold text-sm py-2.5 px-5 rounded-xl hover:bg-slate-100 transition shadow-xs">
            Log Completed Activity
          </button>
        </section>

      </main>

      {/* Lesson Progression Bottom Navigation */}
      <footer className="bg-white border-t border-slate-100 py-6 px-6 mt-auto">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          
          <button className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-semibold transition group py-2">
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            <span>Your AHA toolkit</span>
          </button>

          <button className="flex items-center gap-2 text-teal-700 hover:text-teal-900 text-sm font-semibold transition group py-2">
            <span>Scope and boundaries</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>

        </div>
      </footer>

    </div>
  );
}