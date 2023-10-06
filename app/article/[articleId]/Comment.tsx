'use client'

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatRelativeDate } from "../../libs/utils";

interface CommentProps {
  commenter: any,
  content: any,
  createdAt: any
}

const Comment: React.FC<CommentProps> = ({ commenter, content, createdAt }) => {

  const since = formatRelativeDate(createdAt)

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      width: '100%'
    }}>
      <div style={{
        borderRadius: '100%',
        overflow: 'hidden'
      }}>
        <Image
          src={commenter.image}
          alt=""
          height={35}
          width={35}
        />
      </div>
      <div>
        <p style={{ fontSize: '12px', fontStyle: 'italic' }}>{commenter.firstName || commenter.name} - {since}</p>
        <p>{content}</p>
      </div>
    </div>

  )
}

export default Comment