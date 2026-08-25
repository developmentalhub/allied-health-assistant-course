// Emails Jess and Robyn whenever a new public blog comment
// is submitted and is waiting for approval.

const NOTIFY_EMAILS = [
  "jess@spectrumvillage.com.au",
  "robyn@playmoveimprove.com.au",
];

type NotifyArgs = {
  postSlug: string;
  postTitle?: string | null;
  name: string;
  message: string;
};

export async function notifyNewComment({
  postSlug,
  postTitle,
  name,
  message,
}: NotifyArgs) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "RESEND_API_KEY is not set. Comment email notification skipped.",
    );
    return;
  }

  const snippet = message.slice(0, 400);
  const truncated = message.length > 400;

  const approveUrl =
    "https://supabase.com/dashboard/project/aracabetvunmirlfgylv/editor";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Allied Health Hive <robyn@playmoveimprove.com.au>",
        to: NOTIFY_EMAILS,
        subject: `New blog comment awaiting approval | ${
          postTitle || postSlug
        }`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #22302B; line-height: 1.6;">
            <h2 style="color: #3F6B58;">
              New Allied Health Hive blog comment
            </h2>

            <p>
              <strong>${escapeHtml(name)}</strong> has left a comment on:
            </p>

            <p>
              <strong>${escapeHtml(postTitle || postSlug)}</strong>
            </p>

            <div
              style="
                margin: 24px 0;
                padding: 16px 18px;
                border-left: 4px solid #D9A441;
                background: #FAF6EF;
              "
            >
              ${escapeHtml(snippet)}${truncated ? "…" : ""}
            </div>

            <p>
              The comment is currently hidden from the public blog and is
              waiting for approval.
            </p>

            <p style="margin-top: 24px;">
              <a
                href="${approveUrl}"
                style="
                  display: inline-block;
                  background: #3F6B58;
                  color: #ffffff;
                  padding: 12px 18px;
                  border-radius: 8px;
                  text-decoration: none;
                  font-weight: 600;
                "
              >
                Review comment in Supabase
              </a>
            </p>

            <p style="margin-top: 24px; font-size: 13px; color: #6E8FA3;">
              To publish the comment, open the blog_comments table and change
              approved to true. Delete the row if you do not want the comment
              published.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend comment notification error:", errorText);
    }
  } catch (error) {
    console.error("Comment notification email failed:", error);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}