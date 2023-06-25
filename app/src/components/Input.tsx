import React, { HTMLInputTypeAttribute, ReactElement } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { Icon, IconNames } from './Icon';

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
  height: 100%;
  width: 100%;
  color: ${(props) => props.theme.color.normal};
  font-size: ${(props) => props.theme.fontSize.large};

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

interface CheckBoxInputProps {
  value: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

const CheckBoxInputContainer = styled(Button)`
  margin: ${(props) => props.theme.spacing.medium};
`;

export const CheckBoxInput = ({ value, disabled, onChange }: CheckBoxInputProps) => {
  return (
    <CheckBoxInputContainer onClick={() => onChange?.(!value)} disabled={disabled}>
      <Icon name={value ? IconNames.SQUARE_CHECK : IconNames.SQUARE} size={30} opacity={disabled ? 0.3 : 1} />
    </CheckBoxInputContainer>
  );
};

interface ButtonInputProps {
  name: IconNames;
  onClick: Function;
  color?: string;
  disabled?: boolean;
}

const ButtonInputContainer = styled(Button)`
  margin: ${(props) => props.theme.spacing.medium};
`;

export const ButtonInput = ({ name, onClick, color, disabled }: ButtonInputProps) => {
  return (
    <ButtonInputContainer onClick={() => onClick?.()} disabled={disabled}>
      <Icon name={name} size={28} opacity={disabled ? 0.3 : 1} color={color} />
    </ButtonInputContainer>
  );
};
