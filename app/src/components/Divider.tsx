import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
  width: string;
}

const DividerContainer = styled.hr<{ width: string }>`
  width: ${({ width }) => width};
  border: ${(props) => props.theme.border.normal};
`;

export const Divider = ({ width }: Props): ReactElement => {
  return <DividerContainer width={width} />;
};
