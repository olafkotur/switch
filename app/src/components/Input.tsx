import React, { HTMLInputTypeAttribute, ReactElement } from 'react';
import styled from 'styled-components';

interface TextInputProps {
  placeholder: string;
  value: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  onChange?: (value: string) => void;
}

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

const TextInputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background: ${(props) => props.theme.backgroundColor.primary};
  margin: ${(props) => props.theme.spacing.medium} 0;
  padding: ${(props) => props.theme.spacing.medium};
`;

export const TextInput = ({ value, placeholder, disabled, type, onChange }: TextInputProps): ReactElement => {
  return (
    <TextInputContainer>
      <Input
        type={type ?? 'text'}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
      />
    </TextInputContainer>
  );
};

interface ToggleInputProps {
  id: string;
  value: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

const ToggleInputContainer = styled.div`
  position: relative;
  margin: 0 ${(props) => props.theme.spacing.small};
  margin-top: 3px;
`;
const ToggleInputLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin: 1px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const ToggleInputInner = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${ToggleInputLabel} {
    background: ${(props) => props.theme.highlightColor.primary};
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      margin-left: 17px;
      transition: 0.2s;
    }
  }
`;

export const ToggleInput = ({ id, value, onChange }: ToggleInputProps): ReactElement => {
  return (
    <ToggleInputContainer>
      <ToggleInputInner
        id={id}
        type="checkbox"
        checked={value}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <ToggleInputLabel htmlFor={id} />
    </ToggleInputContainer>
  );
};
