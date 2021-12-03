import React, { HTMLInputTypeAttribute } from 'react';
import './styles.css';

interface IProps {
  value: string;
  onChange: (value: string) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  description?: string;
}

export const TextInput = ({
  value,
  onChange,
  type,
  placeholder,
  description,
}: IProps): React.ReactElement => {
  return (
    <div className="text-input-container">
      <input
        className="text-input bg-secondary"
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="text-muted text-input-description">{description}</span>
    </div>
  );
};
