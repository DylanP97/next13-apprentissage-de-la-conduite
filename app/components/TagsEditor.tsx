'use client'

import React, { useEffect, useState } from 'react'
import plus from '@/public/icons/plus.png'
import Image from 'next/image';

interface TagsEditorProps {
  blogs?: any;
  tags?: any;
  state?: any;
  blogtags?: any;
}

export const TagsEditor: React.FC<TagsEditorProps> = ({ blogs, tags, state, blogtags }) => {
  const [allTagsState, setAllTagsState] = useState<string[]>([]);

  useEffect(() => {
    if (blogs.length > 0) {
      const allTags = new Set();

      blogs && blogs?.forEach((obj: any) => {
        obj.tags.forEach((tag: string) => {
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

  const [newTag, setNewTag] = useState('');

  const addNewTag = () => {
    if (newTag.trim() !== "") {
      const updatedTags = [...allTagsState, newTag.trim()];
      setAllTagsState(updatedTags);
      setNewTag("");
    }
  };

  const handleNewTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  };

  const handleNewTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addNewTag();
    }
  };

  return (
    <div className="tags">
      {allTagsState?.map((tag: string) => (
        tags && tags.includes(tag) ? (
          <div className="badge-tag active-tag" key={tag} onClick={() => handleRemoveTag(tag)}>
            {`#`}{tag} {` `}✖
          </div>
        ) : (
          <div className="badge-tag not-active" key={tag} onClick={() => handleAddTag(tag)}>
            {`#`}{tag}
          </div>
        )
      ))}
      {blogtags && (
        <div className="badge-tag new-tag">
          <input type="text" placeholder='Ajouter un nouveau tag' value={newTag} onChange={handleNewTagChange} onKeyDown={handleNewTagKeyDown} />
          <Image className='new-tag-btn' src={plus} alt="" onClick={addNewTag} />
        </div>
      )}
    </div>
  );
};