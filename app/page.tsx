"use client";

import React, { useState } from 'react';

// Configuration for the learning phases
const LEARNING_PHASES = [
  {
    id: 'watch',
    title: 'Watch',
    description: 'We begin by observing clinical demonstrations. This establishes a visual baseline and helps you recognise correct technique before attempting the movement yourself.'
  },
  {
    id: 'practice',
    title: 'Practice',
    description: 'You will simulate the activity in a controlled environment. This builds muscle memory and allows for safe experimentation without affecting the child’s outcome.'
  },
  {
    id: 'do',
    title: 'Do',
    description: 'You perform the activity with the child under guidance. This is where theory meets real-world application, ensuring the child receives the targeted support they need.'
  },
  {
    id: 'reflect',
    title: 'Reflect',
    description: 'We review the interaction to identify what went well and where to adjust. Reflection is the most important step for professional growth as an Allied Health Assistant.'
  }
];

export default function TopicPage() {
  const [activeStep, setActiveStep] = useState(LEARNING_PHASES[0]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Working within the allied health team</h1>
        <p className="text-slate-600">Our four-step methodology ensures you move from theory to high-quality clinical support.</p>
      </header>

      {/* Interactive Stepper */}
      <section className="mb-10">
        <div className="flex items-center justify-between gap-2 mb-8 bg-slate-100 p-2 rounded-2xl">
          {LEARNING_PHASES.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                activeStep.id === step.id 
                  ? 'bg-white text-indigo-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="mr-2 opacity-60">0{index + 1}</span>
              {step.title}
            </button>
          ))}
        </div>

        {/* Dynamic Content Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-indigo-900 mb-4">{activeStep.title}</h2>
          <p className="text-slate-600 leading-relaxed text-lg">{activeStep.description}</p>
        </div>
      </section>

      {/* Instructional Section */}
      <section className="bg-indigo-900 text-indigo-50 rounded-2xl p-8">
        <h3 className="text-lg font-bold mb-3">Ready to begin?</h3>
        <p className="text-indigo-200 mb-6">Start with the Watch phase to observe your first clinical demonstration.</p>
        <button className="bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-400 transition">
          Start Watching →
        </button>
      </section>
      
    </div>
  );
}