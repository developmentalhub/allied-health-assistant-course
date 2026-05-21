export default function PractitionersLoading() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#faf8f5",
      fontFamily: "DM Sans, sans-serif",
    }}>
      {/* Hero skeleton */}
      <div style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e8e4de",
        padding: "64px 24px 56px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}>
        <div style={sk(120, 12)} />
        <div style={sk(360, 44)} />
        <div style={sk(280, 20)} />
      </div>

      {/* Grid skeleton */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "56px 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "28px",
        }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e8e4de",
              borderRadius: "20px",
              padding: "32px",
            }}>
              <div style={{ ...sk(72, 72), borderRadius: "50%", marginBottom: "20px" }} />
              <div style={{ ...sk(160, 22), marginBottom: "8px" }} />
              <div style={{ ...sk(100, 14), marginBottom: "20px" }} />
              <div style={{ ...sk("100%", 14), marginBottom: "8px" }} />
              <div style={{ ...sk("90%", 14), marginBottom: "8px" }} />
              <div style={{ ...sk("70%", 14), marginBottom: "20px" }} />
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ ...sk(80, 24), borderRadius: "999px" }} />
                <div style={{ ...sk(100, 24), borderRadius: "999px" }} />
                <div style={{ ...sk(70, 24), borderRadius: "999px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
      `}</style>
    </div>
  );
}

function sk(width: number | string, height: number): React.CSSProperties {
  return {
    width: typeof width === "number" ? `${width}px` : width,
    height: `${height}px`,
    borderRadius: "6px",
    background: "linear-gradient(90deg, #ede9e3 25%, #f5f2ee 50%, #ede9e3 75%)",
    backgroundSize: "600px 100%",
    animation: "shimmer 1.4s ease-in-out infinite",
  };
}