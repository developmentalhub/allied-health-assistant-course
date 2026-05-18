"use client";

import { useState } from "react";
import Link from "next/link";

export default function MovementLibrary() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All", 
    "Gross Motor Skills", 
    "Fine Motor Skills", 
    "Sensory", 
    "Play Skills", 
    "Regulation", 
    "Vagus Nerve",
    "Literacy" // Added Literacy here
  ];

  const [resources] = useState([
    { 
      id: 1, 
      title: "8 Play Activities to Build Confidence", 
      category: "Play Skills", 
      type: "PDF Bundle", 
      color: "#3730a3",
      fileName: "confidence-activities.pdf" 
    },
    { 
      id: 2, 
      title: "Crossing the Midline for Literacy Readiness", 
      category: "Literacy", 
      type: "PDF Guide", 
      color: "#0f766e",
      fileName: "midline-literacy.pdf" 
    },
    { 
      id: 3, 
      title: "Vagus Nerve Exercises for Kids", 
      category: "Vagus Nerve", 
      type: "PDF Guide", 
      color: "#16a34a",
      fileName: "vagus-nerve-guide.pdf" 
    },
    { 
      id: 4, 
      title: "Pincer Grasp & Handwriting Foundations", 
      category: "Fine Motor Skills", 
      type: "Printable", 
      color: "#d97706",
      fileName: "handwriting-foundations.pdf" 
    }
  ]);

  return (
    <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh", padding: "40px 20px", fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <header style={{ marginBottom: "30px" }}>
          <Link href="/dashboard" style={{ color: "#3730a3", textDecoration: "none", fontSize: "0.9rem", fontWeight: "600" }}>
            ← Back to Dashboard
          </Link>
          <h1 style={{ color: "#1e1b2e", fontSize: "2.4rem", fontFamily: "var(--font-display)", marginTop: "10px" }}>
            Movement Library
          </h1>
          <p style={{ color: "#64748b", marginTop: "10px" }}>
            Professional resources to support your child's physical and cognitive development.
          </p>
        </header>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "40px", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "10px 22px",
                borderRadius: "25px",
                border: "1px solid #e2e8f0",
                backgroundColor: activeCategory === cat ? "#3730a3" : "white",
                color: activeCategory === cat ? "white" : "#64748b",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.9rem"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resource Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px" }}>
          {resources
            .filter(r => activeCategory === "All" || r.category === activeCategory)
            .map(resource => (
              <div key={resource.id} style={{ 
                backgroundColor: "white", 
                borderRadius: "16px", 
                overflow: "hidden", 
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{ height: "160px", backgroundColor: resource.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "3.5rem" }}>
                  📄
                </div>
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: "bold", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {resource.category}
                  </span>
                  <h3 style={{ fontSize: "1.2rem", color: "#1e1b2e", margin: "10px 0 15px 0", lineHeight: "1.4" }}>{resource.title}</h3>
                  
                  <a 
                    href={`/library/${resource.fileName}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      marginTop: "auto", 
                      backgroundColor: "#3730a3", 
                      color: "white", 
                      padding: "14px", 
                      borderRadius: "10px", 
                      fontWeight: "bold", 
                      textDecoration: "none",
                      textAlign: "center",
                      fontSize: "0.95rem"
                    }}
                  >
                    Access Resource
                  </a>
                </div>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {resources.filter(r => activeCategory !== "All" && r.category === activeCategory).length === 0 && activeCategory !== "All" && (
          <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
            <p>New **{activeCategory}** resources are being prepared for you. Check back shortly.</p>
          </div>
        )}

      </div>
    </div>
  );
}