"use client";

import { useEffect, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  LoaderCircle,
} from "lucide-react";

type SaveContentButtonProps = {
  contentType:
    | "blog"
    | "tool"
    | "webinar"
    | "resource"
    | "topic"
    | "community";
  contentKey: string;
  title: string;
  href: string;
  compact?: boolean;
};

export default function SaveContentButton({
  contentType,
  contentKey,
  title,
  href,
  compact = false,
}: SaveContentButtonProps) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [signedIn, setSignedIn] = useState(true);

  useEffect(() => {
    async function checkSaved() {
      try {
        const params = new URLSearchParams({
          contentType,
          contentKey,
        });

        const response = await fetch(
          `/api/saved-content?${params.toString()}`,
          {
            cache: "no-store",
          },
        );

        if (response.status === 401) {
          setSignedIn(false);
          setSaved(false);
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error || "Could not check saved content.",
          );
        }

        setSaved(Boolean(data.saved));
        setSignedIn(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    checkSaved();
  }, [contentType, contentKey]);

  async function toggleSaved() {
    if (working) return;

    if (!signedIn) {
      window.location.href = `/login?redirect=${encodeURIComponent(
        window.location.pathname,
      )}`;

      return;
    }

    setWorking(true);

    try {
      const response = await fetch("/api/saved-content", {
        method: saved ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType,
          contentKey,
          title,
          href,
        }),
      });

      if (response.status === 401) {
        window.location.href = `/login?redirect=${encodeURIComponent(
          window.location.pathname,
        )}`;

        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Could not update saved content.",
        );
      }

      setSaved(!saved);
    } catch (error) {
      console.error(error);

      window.alert(
        "We could not update your saved items. Please try again.",
      );
    } finally {
      setWorking(false);
    }
  }

  if (loading) {
    return (
      <button
        type="button"
        disabled
        className={
          compact
            ? "inline-flex items-center gap-2 rounded-full border border-[#e8e4de] bg-white px-3 py-2 text-xs font-semibold text-[#6b6880]"
            : "inline-flex items-center gap-2 rounded-full border border-[#e8e4de] bg-white px-4 py-2.5 text-sm font-semibold text-[#6b6880]"
        }
      >
        <LoaderCircle
          size={compact ? 14 : 16}
          className="animate-spin"
        />
        Checking
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleSaved}
      disabled={working}
      aria-pressed={saved}
      className={
        compact
          ? saved
            ? "inline-flex items-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-3 py-2 text-xs font-semibold text-[#0f766e] transition hover:bg-white disabled:opacity-60"
            : "inline-flex items-center gap-2 rounded-full border border-[#e8e4de] bg-white px-3 py-2 text-xs font-semibold text-[#5f5b73] transition hover:border-[#0f766e] hover:text-[#0f766e] disabled:opacity-60"
          : saved
            ? "inline-flex items-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-4 py-2.5 text-sm font-semibold text-[#0f766e] transition hover:bg-white disabled:opacity-60"
            : "inline-flex items-center gap-2 rounded-full border border-[#e8e4de] bg-white px-4 py-2.5 text-sm font-semibold text-[#5f5b73] transition hover:border-[#0f766e] hover:text-[#0f766e] disabled:opacity-60"
      }
    >
      {working ? (
        <LoaderCircle
          size={compact ? 14 : 16}
          className="animate-spin"
        />
      ) : saved ? (
        <BookmarkCheck size={compact ? 14 : 16} />
      ) : (
        <Bookmark size={compact ? 14 : 16} />
      )}

      {working
        ? "Saving..."
        : saved
          ? "Saved"
          : "Save"}
    </button>
  );
}