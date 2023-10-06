"use client";

import Image from "next/image";

interface ButtonProps {
  label: string;
  onClick: any;
  disabled?: boolean;
  icon?: any;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, icon }) => {
  return (
    <button
      data-testid="button"
      className="btn-primary btn-10color"
      disabled={disabled}
      onClick={onClick}
    >
      {icon && (
        <Image
          src={icon}
          alt="icon"
          width={24}
          className="social-login-icon"
          data-testid="button-icon"
        />
      )}
      {label}
    </button>
  );
};

export default Button;
