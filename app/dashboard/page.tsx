"use client";

import { useState } from "react";
import Link from "next/link";

export default function ParentDashboard() {
  const [currentActionItem, setCurrentActionItem] = useState("5 mins of daily log rolling to support reflex integration");
  const [facilitatorName, setFacilitatorName] = useState("Robyn");
  
  // Track the 7 days of the week
  const [progress, setProgress] = useState([
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: false },
    { day: "Thu", completed: false },
    { day: "Fri", completed: false },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false },
  ]);

  const toggleDay = (index: number) => {
    const newProgress = [...progress];
    newProgress[index].completed = !newProgress[index].completed;
    setProgress(newProgress);
  };

  return (
    <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh", padding: "20px", fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "#3730a3", fontSize: "2rem", fontFamily: "var(--font-display)" }}>Welcome back, Sarah</h1>
          <Link href="/profile" style={{ textDecoration: "none", color: "#6b6880", fontWeight: "600" }}>My Profile</Link>
        </header>

        {/* The Action Item Section */}
        <div style={{ 
          backgroundColor: "#ffffff", 
          borderRadius: "16px", 
          padding: "30px", 
          marginBottom: "30px", 
          boxShadow: "0 10px 25px rgba(55, 48, 163, 0.1)",
          border: "2px solid #e0e7ff"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
            <span style={{ fontSize: "1.5rem" }}>🎯</span>
            <h2 style={{ color: "#1e1b2e", fontSize: "1.25rem", margin: 0 }}>Your Focus This Week</h2>
          </div>
          
          <div style={{ 
            backgroundColor: "#f5f3ff", 
            padding: "20px", 
            borderRadius: "12px", 
            borderLeft: "6px solid #3730a3",
            marginBottom: "25px"
          }}>
            <p style={{ fontSize: "1.2rem", color: "#3730a3", fontWeight: "500", margin: 0 }}>
              {currentActionItem}
            </p>
            <p style={{ marginTop: "10px", fontSize: "0.85rem", color: "#6b6880" }}>
              Assigned by <strong>{facilitatorName}</strong>
            </p>
          </div>

          {/* Daily Checklist Tracker */}
          <h3 style={{ fontSize: "1rem", color: "#1e1b2e", marginBottom: "15px" }}>Daily Movement Tracker</h3>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            {progress.map((item, index) => (
              <button
                key={item.day}
                onClick={() => toggleDay(index)}
                style={{
                  flex: 1,
                  padding: "15px 5px",
                  borderRadius: "10px",
                  border: "2px solid",
                  borderColor: item.completed ? "#16a34a" : "#e2e8f0",
                  backgroundColor: item.completed ? "#dcfce7" : "white",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ fontSize: "0.8rem", color: item.completed ? "#166534" : "#64748b", fontWeight: "bold", marginBottom: "5px" }}>
                  {item.day}
                </div>
                <div style={{ fontSize: "1.2rem" }}>
                  {item.completed ? "✅" : "⚪"}
                </div>
              </button>
            ))}
          </div>
          
          <p style={{ marginTop: "20px", textAlign: "center", fontSize: "0.9rem", color: "#6b6880", fontStyle: "italic" }}>
            Consistency over intensity. Just a few minutes each day makes the difference.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <Link href="/sessions/1" style={{ backgroundColor: "#16a34a", color: "white", padding: "20px", borderRadius: "12px", textDecoration: "none", textAlign: "center", fontWeight: "bold" }}>
            Join Today's Session
          </Link>
          <Link href="/resources" style={{ backgroundColor: "white", color: "#3730a3", padding: "20px", borderRadius: "12px", textDecoration: "none", textAlign: "center", fontWeight: "bold", border: "1px solid #e2e8f0" }}>
            View Movement Library
          </Link>
        </div>

      </div>
    </div>
  );
}