"use client";

import React, { useState } from 'react';

export default function QandASurvey({ userId }: { userId: string }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // You can send this data to an API route or directly to Supabase here
    console.log("Survey Data:", Object.fromEntries(formData));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ backgroundColor: "#f0fdf4", padding: "20px", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
        <p style={{ color: "#166534", margin: 0 }}>Thank you for your feedback! We will use this to schedule our next sessions.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px", border: "1px solid #e8e4de" }}>
      <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "20px" }}>Help us schedule!</h3>
      
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", fontSize: "14px", marginBottom: "8px" }}>Best day and time for you?</label>
        <input name="preferred_time" required placeholder="e.g., Tuesday mornings AEST" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db" }} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", fontSize: "14px", marginBottom: "8px" }}>Live or pre-recorded?</label>
        <select name="preference" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db" }}>
          <option value="live">I prefer live sessions</option>
          <option value="prerecorded">I prefer pre-recorded</option>
          <option value="both">Both work for me</option>
        </select>
      </div>

      <button type="submit" style={{ backgroundColor: "#3730a3", color: "white", padding: "10px 20px", borderRadius: "999px", border: "none", cursor: "pointer", fontWeight: 600 }}>
        Submit preferences
      </button>
    </form>
  );
}