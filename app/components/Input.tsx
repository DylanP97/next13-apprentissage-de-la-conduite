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
  errors: FieldErrors,
  defaultValue?: any,
}

const Input: React.FC<InputProps> = ({
  id,
  type, 
  disabled, 
  register,
  required,
  defaultValue
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
}
 
export default Input;