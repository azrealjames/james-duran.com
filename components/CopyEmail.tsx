"use client";

import { useRef, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const ref = useRef<HTMLElement>(null);
  const [label, setLabel] = useState("Copy email");

  function reset() {
    setTimeout(() => setLabel("Copy email"), 1800);
  }

  function selectText() {
    const el = ref.current;
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    setLabel("Press Ctrl+C");
    reset();
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setLabel("Copied");
      reset();
    } catch {
      selectText();
    }
  }

  return (
    <div className="mail">
      <code ref={ref}>{email}</code>
      <button className="btn" type="button" onClick={copy}>
        {label}
      </button>
    </div>
  );
}
