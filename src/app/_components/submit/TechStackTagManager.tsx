"use client";

import { useState } from "react";

interface TechStackTagManagerProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export function TechStackTagManager({
  tags,
  onAddTag,
  onRemoveTag,
}: TechStackTagManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newTagInput.trim()) {
        onAddTag(newTagInput.trim());
        setNewTagInput("");
        setIsAdding(false);
      }
    } else if (e.key === "Escape") {
      setIsAdding(false);
      setNewTagInput("");
    }
  };

  return (
    <div>
      <label className="block font-headline text-label-md text-on-surface-variant mb-2">
        Primary Architectural Stacks
      </label>
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-headline bg-white/[0.06] border border-white/15 text-primary flex items-center gap-1.5 shadow-[0_0_8px_rgba(124,58,237,0.2)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              className="text-on-surface-variant hover:text-white transition-colors cursor-pointer"
              title={`Remove ${tag}`}
            >
              <span className="material-symbols-outlined text-[12px]">close</span>
            </button>
          </span>
        ))}

        {isAdding ? (
          <input
            type="text"
            autoFocus
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (newTagInput.trim()) onAddTag(newTagInput.trim());
              setIsAdding(false);
              setNewTagInput("");
            }}
            placeholder="Press Enter..."
            className="px-3 py-1 rounded-full text-xs font-headline bg-white/[0.08] border border-primary text-white outline-none w-28"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="px-2.5 py-1 rounded-full text-xs font-headline border border-dashed border-white/20 text-on-surface-variant hover:border-primary hover:text-primary transition-all flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            <span>Add Tag</span>
          </button>
        )}
      </div>
    </div>
  );
}
