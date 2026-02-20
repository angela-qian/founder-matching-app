"use client";

import { useState, KeyboardEvent, useRef } from "react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  tags,
  onChange,
  placeholder = "Add a tag...",
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (tags.includes(trimmed)) {
      inputRef.current?.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(6px)" },
          { transform: "translateX(-4px)" },
          { transform: "translateX(4px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 300, easing: "ease-in-out" }
      );
      return;
    }
    onChange([...tags, trimmed]);
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Input row */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder:text-slate-400 outline-none transition-all duration-150 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 focus:bg-white"
        />
        <button
          type="button"
          onClick={addTag}
          className="px-5 py-2.5 rounded-lg bg-teal-400 hover:bg-teal-500 text-white text-sm font-semibold whitespace-nowrap transition-all duration-150 active:scale-95"
        >
          Add
        </button>
      </div>

      {/* Pills */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full border border-teal-400 bg-teal-400/10 text-teal-500 text-xs font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag}`}
                className="inline-flex items-center justify-center w-4 h-4 rounded-full text-sm leading-none text-teal-500 hover:bg-teal-400 hover:text-white transition-all duration-150"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}