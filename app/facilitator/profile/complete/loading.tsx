export default function CompleteProfileLoading() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#faf8f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "16px",
      fontFamily: "DM Sans, sans-serif",
    }}>
      <div style={{
        width: "36px",
        height: "36px",
        border: "3px solid #e8e4de",
        borderTop: "3px solid #3730a3",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ fontSize: "14px", color: "#6b6880", margin: 0 }}>Loading your profile…</p>
    </div>
  );
}