"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccessCodePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const cleanCode = code.trim().toUpperCase();

      const res = await fetch("/api/access-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: cleanCode })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "That code did not work. Please try again.");
        setLoading(false);
        return;
      }

      localStorage.setItem("pmi_customer_access", "true");
      localStorage.setItem("pmi_customer_access_code", cleanCode);
      localStorage.setItem("pmi_customer_access_time", new Date().toISOString());

      router.push(data.redirectPath || "/videos");
    } catch {
      setMessage("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff8f1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px"
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
          border: "1px solid #eadfce"
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            lineHeight: "1.1",
            marginBottom: "12px",
            color: "#21463f"
          }}
        >
          Access your resources
        </h1>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.5",
            color: "#5f5f5f",
            marginBottom: "24px"
          }}
        >
          Enter the access code Robyn gave you, then press the button below.
        </p>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="access-code"
            style={{
              display: "block",
              fontWeight: 700,
              color: "#21463f",
              marginBottom: "8px"
            }}
          >
            Access code
          </label>

          <input
            id="access-code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter your code"
            autoComplete="off"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "16px",
              fontSize: "20px",
              borderRadius: "14px",
              border: "1px solid #d7c8b8",
              marginBottom: "18px",
              textTransform: "uppercase"
            }}
          />

          <button
            type="submit"
            disabled={loading || !code.trim()}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "999px",
              border: "none",
              background: loading || !code.trim() ? "#9ab8af" : "#2f6f61",
              color: "white",
              fontSize: "18px",
              fontWeight: 700,
              cursor: loading || !code.trim() ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Checking..." : "Open my resources"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "18px",
              color: "#8a3a3a",
              fontWeight: 600,
              lineHeight: "1.4"
            }}
          >
            {message}
          </p>
        )}

        <p
          style={{
            marginTop: "24px",
            fontSize: "14px",
            color: "#777",
            lineHeight: "1.5"
          }}
        >
          Having trouble? Copy and paste the code from your email, or contact
          Play Move Improve for help.
        </p>
      </section>
    </main>
  );
}