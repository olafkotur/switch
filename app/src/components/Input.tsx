import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface InputProps {
  placeholder: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: ${(props) => props.theme.spacing.medium};
`;

export const Input = styled.input`
  border: none;
  background: none;
  height: 50px;
  color: ${(props) => props.theme.color.normal};
  font-size: ${(props) => props.theme.fontSize.medium};
  height: 100%;
  &:focus {
    outline: none;
  }
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const TextInput = ({ value, placeholder, disabled, onChange }: InputProps): ReactElement => {
  return (
    <InputContainer>
      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
      />
    </InputContainer>
  );
};
