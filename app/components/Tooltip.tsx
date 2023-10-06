"use client";

import { useState } from "react";

interface TooltipProps {
  message: string;
  children: React.ReactNode;
  clicking?: any;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children, clicking }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      data-testid="tooltip"
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={clicking}
    >
      {children}
      {isHovered && <div className="tooltip">{message}</div>}
    </div>
  );
};

export default Tooltip;
