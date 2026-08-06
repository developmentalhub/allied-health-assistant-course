"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  ClipboardList,
  ExternalLink,
  X,
} from "lucide-react";

type Tool = {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: "course" | "feedback";
};

const freeTools: Tool[] = [
  {
    id: "aha-course-tools",
    title: "AHA Course Tools Preview",
    description:
      "Explore the starter AHA tools and get a feel for the kind of practical support being built inside the hive.",
    url: "https://allied-health-assistant-course.netlify.app/",
    icon: "course",
  },
  {
    id: "clinic-session-feedback",
    title: "Clinic Session Feedback Tool",
    description:
      "Reflect after a clinic session, organise observations and prepare clearer feedback for the supervising professional.",
    url: "https://aha-clinic-session-feedback.netlify.app/",
    icon: "feedback",
  },
];

export default function EmbeddedFreeTools() {
  const [openToolId, setOpenToolId] = useState<string | null>(null);

  function toggleTool(toolId: string) {
    setOpenToolId((currentToolId) =>
      currentToolId === toolId ? null : toolId,
    );
  }

  return (
    <div className="grid gap-5">
      {freeTools.map((tool) => {
        const isOpen = openToolId === tool.id;

        return (
          <article
            key={tool.id}
            className="overflow-hidden rounded-3xl border border-[#99f6e4] bg-[#f0fdfa]"
          >
            <div className="p-6 md:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#0f766e]">
                  {tool.icon === "course" ? (
                    <ClipboardList size={24} />
                  ) : (
                    <ClipboardCheck size={24} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 text-xl font-bold text-[#1e1b2e]">
                    {tool.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#3f5f5a]">
                    {tool.description}
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => toggleTool(tool.id)}
                      aria-expanded={isOpen}
                      aria-controls={`${tool.id}-embedded-tool`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962] focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:ring-offset-2"
                    >
                      {isOpen ? "Close tool" : "Use tool here"}

                      {isOpen ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>

                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1] focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:ring-offset-2"
                    >
                      Open full screen
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {isOpen && (
              <div
                id={`${tool.id}-embedded-tool`}
                className="border-t border-[#99f6e4] bg-white"
              >
                <div className="flex items-center justify-between gap-4 border-b border-[#e8e4de] px-4 py-3 md:px-6">
                  <div>
                    <p className="text-sm font-semibold text-[#1e1b2e]">
                      {tool.title}
                    </p>

                    <p className="text-xs text-[#6b6880]">
                      Complete the tool without leaving the community.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenToolId(null)}
                    aria-label={`Close ${tool.title}`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e8e4de] bg-[#faf8f5] text-[#1e1b2e] transition hover:bg-[#f0fdfa]"
                  >
                    <X size={18} />
                  </button>
                </div>

                <iframe
                  src={tool.url}
                  title={tool.title}
                  loading="lazy"
                  className="h-[760px] w-full border-0 md:h-[850px]"
                  allow="clipboard-read; clipboard-write"
                />
              </div>
            )}
          </article>
        );
      })}

      <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
        <p className="text-xs leading-relaxed text-[#6b6880]">
          Having trouble viewing an embedded tool? Select “Open full screen” to
          use it in a separate browser tab.
        </p>
      </div>
    </div>
  );
}