import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog-posts";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function BlogOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf6ef",
          padding: "68px 78px",
          color: "#22302b",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "999px",
                background: "#3f6b58",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
              }}
            >
              🐝
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "25px",
                  fontWeight: 700,
                }}
              >
                Allied Health Hive
              </div>

              <div
                style={{
                  marginTop: "4px",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#6e8fa3",
                }}
              >
                Jess Foster + Robyn Papworth
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "10px 16px",
              borderRadius: "999px",
              background: "#efe2c8",
              color: "#2e4f40",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            {post.tag}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              fontSize: "58px",
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            {post.title}
          </div>

          <div
            style={{
              marginTop: "28px",
              maxWidth: "930px",
              fontSize: "23px",
              lineHeight: 1.45,
              color: "#5f5b73",
            }}
          >
            {post.excerpt}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #e4dcc9",
            paddingTop: "24px",
            fontSize: "17px",
            color: "#6e8fa3",
          }}
        >
          <div>Allied Health Blog</div>

          <div
            style={{
              color: "#3f6b58",
              fontWeight: 700,
            }}
          >
            {post.readMinutes} min read
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}