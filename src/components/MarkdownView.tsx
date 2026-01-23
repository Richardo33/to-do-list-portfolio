"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";

export default function MarkdownView({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  return (
    <div className={["text-sm leading-relaxed", className].join(" ")}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Unordered list: kita bikin bullet manual (anti CSS global)
          ul: ({ children }) => <ul className="mt-1 space-y-1">{children}</ul>,
          li: ({ children }) => (
            <li className="flex items-start gap-2">
              {/* bullet manual */}
              <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
              <span className="min-w-0 break-words text-white/90">
                {children}
              </span>
            </li>
          ),

          // (opsional) paragraph spacing
          p: ({ children }) => <p className="text-white/90">{children}</p>,

          // inline code chip
          code: ({ children }) => (
            <code className="px-1 py-0.5 rounded bg-white/10 text-white">
              {children}
            </code>
          ),
        }}
      >
        {value}
      </ReactMarkdown>
    </div>
  );
}
