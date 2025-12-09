"use client";

import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "../libs/utils";

interface TagsEditorProps {
  blogs?: any[];
  tags?: string[];
  state: (tags: string[]) => void;
  blogtags?: string[];
  allowCreate?: boolean; // new: control if new tags can be added
}

export const TagsEditor: React.FC<TagsEditorProps> = ({
  blogs = [],
  tags = [],
  state,
  blogtags,
  allowCreate = true,
}) => {
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Extract all unique tags from existing blogs
  useEffect(() => {
    const tagSet = new Set<string>();
    blogs.forEach((blog) =>
      blog?.tags?.forEach((tag: string) => tagSet.add(tag))
    );
    setAvailableTags(Array.from(tagSet));
  }, [blogs]);

  // Sync with external blogtags if needed
  useEffect(() => {
    if (blogtags && blogtags.length > 0) {
      state(blogtags);
    }
  }, [blogtags, state]);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      state([...tags, tag]);
    }
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    state(tags.filter((t) => t !== tagToRemove));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = inputValue.trim();
      if (value) {
        addTag(value);
      }
    }
  };

  const handleCreateNewTag = () => {
    const value = inputValue.trim();
    if (value) {
      addTag(value);
    }
  };

  const selectedTags = tags || [];
  const unselectedTags = availableTags.filter((t) => !selectedTags.includes(t));

  return (
    <div className="w-full space-y-4" data-testid="TagsEditor">
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs px-3 py-1.5 rounded-full shadow-sm hover:shadow transition-all duration-200 group "
          >
            #{tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-1 opacity-70 hover:opacity-100 transition-opacity"
              aria-label={`Remove tag ${tag}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}

        {/* Input for new tag */}
        {allowCreate && (
          <div
            className={cn(
              "flex items-center gap-2 bg-white border-2 border-dashed rounded-full px-4 py-1.5 transition-all",
              isFocused
                ? "border-cyan-500 shadow-md ring-2 ring-cyan-100"
                : "border-gray-300"
            )}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={selectedTags.length === 0 ? "Ajouter des tags..." : "+ Ajouter"}
              className="outline-none text-xs text-gray-700 placeholder-gray-400 min-w-[120px]"
            />
            {inputValue && (
              <button
                onMouseDown={(e) => e.preventDefault()} // prevent blur
                onClick={handleCreateNewTag}
                className="text-cyan-600 hover:text-cyan-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Suggested Tags (from existing blogs) */}
      {unselectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center my-2">
          <span className="text-xs text-gray-500 font-medium mr-2">Suggestions :</span>
          {unselectedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => addTag(tag)}
              className="text-xs font-medium text-gray-600 bg-gray-100 hover:bg-cyan-100 hover:text-cyan-700 px-3 py-1 rounded-full transition-all duration-200 hover:shadow-sm"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};