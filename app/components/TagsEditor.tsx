"use client";

import React, { useEffect, useState } from "react";
import plus from "@/public/icons/plus.png";
import Image from "next/image";

interface TagsEditorProps {
  blogs?: any;
  tags?: any;
  state?: any;
  blogtags?: any;
}

export const TagsEditor: React.FC<TagsEditorProps> = ({
  blogs,
  tags,
  state,
  blogtags,
}) => {
  const [allTagsState, setAllTagsState] = useState<string[]>([]);

  useEffect(() => {
    if (blogs?.length > 0) {
      const allTags = new Set();

      blogs &&
        blogs?.forEach((obj: any) => {
          obj?.tags?.forEach((tag: string) => {
            allTags.add(tag);
          });
        });

      setAllTagsState(Array.from(allTags) as string[]);
    }
  }, [blogs, setAllTagsState]);

  useEffect(() => {
    if (blogtags) {
      state(blogtags);
    }
  }, [blogtags, state]);

  const handleAddTag = (tag: string) => {
    if (tags && !tags.includes(tag)) {
      const updatedTags = [...tags, tag];
      state(updatedTags);
    }
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = tags.filter((t: string) => t !== tag);
    state(updatedTags);
  };

  const [newTag, setNewTag] = useState("");

  const addNewTag = () => {
    if (newTag.trim() !== "") {
      const updatedTags = [...allTagsState, newTag.trim()];
      setAllTagsState(updatedTags);
      setNewTag("");
      handleAddTag(newTag.trim());
    }
  };

  const handleNewTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  };

  const handleNewTagKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      addNewTag();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-2 mt-4" data-testid="TagsEditor">
      {allTagsState?.map((tag: string) =>
        tags && tags.includes(tag) ? (
          <div
            className="bg-gradient-to-l from-[#91e5f6] to-[#118ba3] text-[#030213] text-xs px-3 py-1 rounded-full cursor-pointer font-semibold"
            key={tag}
            data-testid="TagsEditor-removeTag"
            onClick={() => handleRemoveTag(tag)}
          >
            {`#`}
            {tag} {` `}✖
          </div>
        ) : (
          <div
            className="bg-white text-[#030213] text-xs px-3 py-1 rounded-full cursor-pointer font-semibold hover:bg-gradient-to-l hover:from-[#91e5f6] hover:to-[#118ba3] hover:text-[#030213]"
            key={tag}
            data-testid="TagsEditor-addTag"
            onClick={() => handleAddTag(tag)}
          >
            {`#`}
            {tag}
          </div>
        ),
      )}
      {blogtags && (
        <div className="bg-white text-[#030213] rounded-full px-3 py-1 flex items-center">
          <input
            type="text"
            placeholder="Ajouter un nouveau tag"
            value={newTag}
            onChange={handleNewTagChange}
            onKeyDown={handleNewTagKeyDown}
            className="bg-transparent outline-none text-[#030213] placeholder-[#030213] text-xs"
          />
          <Image
            data-testid="TagsEditor-addNewTag"
            className="ml-2 cursor-pointer w-4 h-4"
            src={plus}
            alt=""
            onClick={addNewTag}
          />
        </div>
      )}
    </div>
  );
};