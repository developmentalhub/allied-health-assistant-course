import Link from "next/link";

export default async function SessionsPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      
      {/* Hero Section */}
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px 48px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px" }}>
          Developmental support tailored to your child's needs
        </h1>
        <p style={{ fontSize: "18px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
          Every child's journey is different. Whether you are navigating after-school meltdowns, handwriting struggles, or seeking to build foundational literacy skills, I am here to help. Register your interest below so I can understand what your family needs right now.
        </p>
      </section>

      {/* Offerings Section */}
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gap: "24px" }}>
          
          {[
            { 
              title: "Literacy & Learning Programme", 
              pain: "Does your child struggle with rhythm, focus, or the foundations of reading?", 
              desc: "My evidence-based programme integrates movement and executive function to make literacy engaging and accessible." 
            },
            { 
              title: "Small Group Sessions", 
              pain: "Are you looking for a supportive environment where your child can build social confidence and regulation skills?", 
              desc: "I facilitate small groups that focus on sensory processing, movement, and learning to navigate big feelings together." 
            },
            { 
              title: "Individual Telehealth", 
              pain: "Do you need personalised strategies for challenges at home or school that are specific to your child?", 
              desc: "One-on-one sessions where we dive deep into your child's unique profile to create a plan that actually works." 
            }
          ].map((item, index) => (
            <div key={index} style={{ backgroundColor: "white", padding: "32px", borderRadius: "16px", border: "1px solid #e8e4de" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#3730a3", margin: "0 0 8px" }}>{item.title}</h2>
              <p style={{ fontSize: "15px", fontWeight: 500, color: "#1e1b2e", margin: "0 0 8px" }}>{item.pain}</p>
              <p style={{ fontSize: "14px", color: "#6b6880", lineHeight: 1.6, margin: "0 0 20px" }}>{item.desc}</p>
              <Link href="/register-interest" style={{ backgroundColor: "#3730a3", color: "white", padding: "10px 20px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
                Tell me what you need
              </Link>
            </div>
          ))}

        </div>
      </section>
    </main>
  );
}