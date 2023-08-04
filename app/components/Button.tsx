'use client';


import { interfaceIcons } from "@/public/interface";
import Image from "next/image";
import ButtonBootstrap from "react-bootstrap/Button"

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: any;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  icon,
}) => {
  return (
    <button
      className="btn-primary btn-10color"
      disabled={disabled}
      onClick={onClick}
    // className={`
    //   relative
    //   disabled:opacity-70
    //   disabled:cursor-not-allowed
    //   rounded-lg
    //   hover:opacity-80
    //   transition
    //   w-full
    //   ${outline ? 'bg-white' : 'bg-rose-500'}
    //   ${outline ? 'border-black' : 'border-rose-500'}
    //   ${outline ? 'text-black' : 'text-white'}
    //   ${small ? 'text-sm' : 'text-md'}
    //   ${small ? 'py-1' : 'py-3'}
    //   ${small ? 'font-light' : 'font-semibold'}
    //   ${small ? 'border-[1px]' : 'border-2'}
    // `}
    >
      {icon && (
        <Image
          src={icon}
          alt="icon"
          width={24}
          className="social-login-icon"
        />
      )}
      {label}
    </button>
  );
}

export default Button;