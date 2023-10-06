"use client";

import { Form } from "react-bootstrap";
import { FieldErrors } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  defaultValue?: any;
}

const Input: React.FC<InputProps> = ({
  id,
  register,
  type,
  disabled,
  required,
  defaultValue,
}) => {
  return (
    <Form.Control
      id={id}
      disabled={disabled}
      {...register(id, { required })}
      placeholder="current"
      type={type}
      defaultValue={defaultValue}
    />
  );
};

export default Input;
