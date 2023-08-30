'use client';

import { Form } from 'react-bootstrap';
import { FieldErrors } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  type = "text", 
  disabled, 
  register,
  required,
}) => {
  return (
      <Form.Control
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder="current"
        type={type}
      />
   );
}
 
export default Input;