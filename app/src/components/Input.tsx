import React, { HTMLInputTypeAttribute, ReactElement } from 'react';
import styled from 'styled-components';
// @ts-ignore - types are not available for this dependency
import Toggle from 'react-input-switch';

interface InputProps {
  placeholder?: string;
  value?: any;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  onChange?: (value: any) => void;
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background: ${(props) => props.theme.backgroundColor.primary};
  margin: ${(props) => props.theme.spacing.medium} 0;
  padding: ${(props) => props.theme.spacing.medium};
`;

export const Input = styled.input`
  border: none;
  background: none;
  height: 50px;
  color: ${(props) => props.theme.color.normal};
  font-size: ${(props) => props.theme.fontSize.medium};
  height: 100%;
  width: 100%;
  &:focus {
    outline: none;
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const TextInput = ({ value, placeholder, disabled, type = 'text', onChange }: InputProps): ReactElement => {
  return (
    <InputContainer>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
      />
    </InputContainer>
  );
};

export const ToggleInput = ({ value, onChange }: InputProps): ReactElement => {
  return <Toggle value={value} onChange={onChange} />;
};
