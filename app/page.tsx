'use strict';

import React, { useState } from 'react';

// Define the behaviors and practical movement strategies for overwhelmed educators
const BEHAVIOR_STRATEGIES = [
  {
    id: 'dysregulated',
    label: 'Screen-Time Dysregulation & Meltdowns',
    description: 'When children are highly irritable, glazed over, or struggling to transition away from devices.',
    strategy: 'Vestibular Reset (The Gentle Rock)',
    actionSteps: [
      'Have the children sit on the floor with their knees tucked to their chest.',
      'Encourage them to gently rock backward and forward on a soft mat, or rock side to side like a boat.',
      'Keep your voice calm, slow, and low to help lower their nervous system arousal levels.'
    ],
    duration: '2 to 3 minutes'
  },
  {
    id: 'fidgety',
    label: 'Fidgeting, Bumping, & High Energy',
    description: 'When children are constantly moving, touching others, or seeking physical input.',
    strategy: 'Proprioceptive Heavy Work (Wall Pushes)',
    actionSteps: [
      'Ask the children to place both hands flat against a sturdy wall.',
      'Instruct them to push as hard as they can for 10 seconds, as if they are trying to push the wall into the next room.',
      'Relax for 5 seconds, then repeat 3 times to provide deep muscle feedback.'
    ],
    duration: '1 to 2 minutes'
  },
  {
    id: 'slouching',
    label: 'Slouching, Low Tone, & Fatigue',
    description: 'When children appear floppy, lack core stability, or lean heavily on tables and peers.',
    strategy: 'Core Activation (The Starfish Stretch)',
    actionSteps: [
      'Have the children stand up tall with wide spaces between each other.',
      'Reach arms and legs out wide like a starfish, holding the position for 5 seconds.',
      'Curl inward tightly like a ball, then release back out to activate core stabilizers.'
    ],
    duration: '2 minutes'
  }
];

export default function Home() {
  // State to track which behavior an educator has selected
  const [selectedBehavior, setSelectedBehavior] = useState(BEHAVIOR_STRATEGIES[0].id);

  // Find the active strategy details based on selection
  const activeStrategy = BEHAVIOR_STRATEGIES.find(b => b.id === selectedBehavior) || BEHAVIOR_STRATEGIES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
      
      {/* Warm Educational Header Banner */}
      <header className="bg-gradient-to-b from-teal-50/50 to-transparent pt-16 pb-12 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
            The Allied Health & Educator Resource Academy
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Practical, movement-based strategies to support child self-regulation, reducing the overwhelm of modern classroom behaviors.
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Pathway Split Section */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Left Path: Allied Health Assistants */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="inline-block text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-4">
                Allied Health Assistants
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Clinical Strategy Delivery
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Bridge the gap between formal therapy plans and classroom routines. Access structured pediatric milestone trackers, documentation frameworks, and primitive reflex integration tools.
              </p>
              
              {/* Free Resource Preview Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                <span className="text-xs font-bold uppercase tracking-wide text-teal-600 block mb-1">
                  Free Starter Access
                </span>
                <p className="text-sm text-slate-600">
                  Includes Introductory Training Video & AHA Framework Implementation Manual (PDF).
                </p>
              </div>
            </div>
            
            <button className="w-full bg-teal-600 text-white font-medium py-3 px-4 rounded-xl hover:bg-teal-700 active:bg-teal-800 transition shadow-sm">
              Access AHA Training Portal
            </button>
          </div>

          {/* Right Path: Early Childhood Educators */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full mb-4">
                Early Childhood Educators
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Classroom Regulation Support
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We know you are navigating complex sensory needs and screen-addicted dysregulation. Find immediate, actionable movement paths to meet Thriving Kids guidelines without increasing your administrative paperwork.
              </p>

              {/* Free Resource Preview Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                <span className="text-xs font-bold uppercase tracking-wide text-amber-600 block mb-1">
                  Free Starter Access
                </span>
                <p className="text-sm text-slate-600">
                  Includes De-escalation Movement Video & Interactive Sensory Strategy Audit (PDF).
                </p>
              </div>
            </div>

            <a 
              href="#behavior-selector" 
              className="w-full bg-amber-600 text-white font-medium py-3 px-4 rounded-xl hover:bg-amber-700 active:bg-amber-800 transition text-center shadow-sm"
            >
              Explore Classroom Tools Below
            </a>
          </div>

        </section>

        <hr className="border-slate-200 mb-16" />

        {/* Integrated Joyful Educator Interactive Tool Section */}
        <section id="behavior-selector" className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-10">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Instant Classroom Support Tool
            </h2>
            <p className="text-slate-600">
              Select the behavioral presentation you are seeing right now to access a fast, evidence-based regulation movement strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-8">
            {BEHAVIOR_STRATEGIES.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedBehavior(item.id)}
                className={`p-4 text-left rounded-xl border font-medium transition text-sm flex flex-col justify-between ${
                  selectedBehavior === item.id
                    ? 'border-amber-500 bg-amber-50/50 text-amber-900 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Render Active Regulation Strategy */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h3 className="text-xl font-bold text-slate-900">
                Strategy: {activeStrategy.strategy}
              </h3>
              <span className="text-xs font-semibold text-slate-500 bg-slate-200/60 px-2.5 py-1 rounded-md">
                Estimated Time: {activeStrategy.duration}
              </span>
            </div>
            
            <p className="text-sm text-slate-600 italic mb-6">
              {activeStrategy.description}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              How to implement this with children:
            </h4>
            
            <ol className="space-y-3">
              {activeStrategy.actionSteps.map((step, index) => (
                <li key={index} className="flex gap-4 text-slate-700 leading-relaxed text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center font-semibold text-xs text-slate-500">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="text-center py-12 text-xs text-slate-400 border-t border-slate-100 mt-12">
        <p>&copy; {new Date().getFullYear()} Play Move Improve. All rights reserved.</p>
      </footer>

    </div>
  );
}