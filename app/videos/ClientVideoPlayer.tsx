"use client";

import React, { useState } from 'react';
import { supabase } from "@/lib/supabase";

interface Video {
  order: number;
  id: string;
  module: string;
  category: string;
  title: string;
  videoUrl: string;
  printableUrl: string;
}

interface PlayerProps {
  initialVideos: Video[];
  savedProgress: number;
  userId: string;
}

export default function ClientVideoPlayer({ initialVideos, savedProgress, userId }: PlayerProps) {
  const [unlockedLessonOrder, setUnlockedLessonOrder] = useState<number>(savedProgress);
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories for the filter buttons
  const categories = ['All', ...Array.from(new Set(initialVideos.map(v => v.category)))];

  // Filter the videos based on the selected category
  const filteredVideos = selectedCategory === 'All' 
    ? initialVideos 
    : initialVideos.filter(v => v.category === selectedCategory);

  const currentLesson = initialVideos[currentLessonIndex];

  const handleLessonComplete = async () => {
    const nextOrder = currentLesson.order + 1;
    if (nextOrder <= initialVideos.length) {
      if (nextOrder > unlockedLessonOrder) {
        setUnlockedLessonOrder(nextOrder);
        await supabase.from("profiles").update({ current_progress: nextOrder }).eq("id", userId);
      }
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      alert("Sensational effort, you have completed all available pre-literacy activities.");
    }
  };

  return (
    <div>
      {/* Category Filter Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: selectedCategory === cat ? 'none' : '1px solid #e5e7eb',
              backgroundColor: selectedCategory === cat ? '#3730a3' : '#ffffff',
              color: selectedCategory === cat ? '#ffffff' : '#1e1b2e',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        {/* Main Video Area */}
        <div style={{ flex: "2", minWidth: "320px", backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#3730a3', fontWeight: 'bold', letterSpacing: '1px' }}>
            {currentLesson.module} | {currentLesson.category}
          </span>
          <h2 style={{ fontSize: '20px', margin: '8px 0 20px 0', color: '#1e1b2e', fontWeight: 500 }}>
            Activity {currentLesson.order}: {currentLesson.title}
          </h2>

          <div style={{ position: 'relative', paddingBottom: '56.25%', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
            <video key={currentLesson.videoUrl} controls controlsList="nodownload" style={{ position: 'absolute', width: '100%', height: '100%' }}>
              <source src={currentLesson.videoUrl} type="video/mp4" />
            </video>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {currentLesson.printableUrl && (
              <a href={currentLesson.printableUrl} target="_blank" rel="noreferrer" style={{ padding: '12px 20px', backgroundColor: '#faf8f5', color: '#3730a3', borderRadius: '30px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                📥 Download Activity Sheets
              </a>
            )}
            <button onClick={handleLessonComplete} style={{ padding: '12px 24px', backgroundColor: '#3730a3', color: '#ffffff', border: 'none', borderRadius: '30px', fontWeight: 600, cursor: 'pointer' }}>
              Complete & Next Video →
            </button>
          </div>
        </div>

        {/* Sidebar Programme Flow */}
        <div style={{ flex: "1", minWidth: '280px', backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', maxHeight: '75vh', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Your Programme Flow</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredVideos.map((lesson) => {
              const isUnlocked = lesson.order <= unlockedLessonOrder;
              const isActive = lesson.order === currentLesson.order;
              return (
                <button
                  key={lesson.id}
                  disabled={!isUnlocked}
                  onClick={() => setCurrentLessonIndex(initialVideos.findIndex(v => v.id === lesson.id))}
                  style={{
                    textAlign: 'left',
                    padding: '12px',
                    borderRadius: '8px',
                    border: isActive ? '1px solid #3730a3' : '1px solid #e5e7eb',
                    backgroundColor: isActive ? '#faf8f5' : isUnlocked ? '#ffffff' : '#f9fafb',
                    cursor: isUnlocked ? 'pointer' : 'not-allowed',
                    width: '100%'
                  }}
                >
                  <div style={{ fontSize: '11px', color: '#6b6880' }}>Activity {lesson.order}</div>
                  <div style={{ fontSize: '13px', fontWeight: isActive ? 600 : 400 }}>{lesson.title}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}