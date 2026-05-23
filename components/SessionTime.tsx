"use client";

import { useEffect, useState } from "react";

interface SessionTimeProps {
  scheduledAt: string;
  durationMinutes?: number;
  showDate?: boolean;
  showTimezone?: boolean;
}

export default function SessionTime({ scheduledAt, durationMinutes, showDate = true, showTimezone = true }: SessionTimeProps) {
  const [timeString, setTimeString] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");
  const [tzName, setTzName] = useState<string>("");

  useEffect(() => {
    const date = new Date(scheduledAt);
    const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    setDateString(date.toLocaleDateString("en-AU", {
      weekday: "short", day: "numeric", month: "long", year: "numeric",
      timeZone: userTz,
    }));

    setTimeString(date.toLocaleTimeString("en-AU", {
      hour: "2-digit", minute: "2-digit", hour12: true,
      timeZone: userTz,
    }));

    // Get a short timezone label
    const tzShort = date.toLocaleTimeString("en-AU", {
      timeZoneName: "short", timeZone: userTz,
    }).split(" ").pop() || userTz;

    setTzName(tzShort);
  }, [scheduledAt]);

  if (!timeString) {
    // SSR fallback — show Melbourne time
    const date = new Date(scheduledAt);
    const fallbackDate = date.toLocaleDateString("en-AU", {
      weekday: "short", day: "numeric", month: "long", year: "numeric",
      timeZone: "Australia/Melbourne",
    });
    const fallbackTime = date.toLocaleTimeString("en-AU", {
      hour: "2-digit", minute: "2-digit", hour12: true,
      timeZone: "Australia/Melbourne",
    });
    return (
      <span>
        {showDate && `${fallbackDate} · `}{fallbackTime} AEST
        {durationMinutes && ` · ${durationMinutes} min`}
      </span>
    );
  }

  return (
    <span>
      {showDate && `${dateString} · `}{timeString}{showTimezone && ` ${tzName}`}
      {durationMinutes && ` · ${durationMinutes} min`}
    </span>
  );
}