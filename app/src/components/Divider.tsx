import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
  width?: number;
  height?: number;
}

const DividerContainer = styled.hr<{ width: number; height: number }>`
  margin: ${(props) => props.theme.spacing.veryLarge};
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: ${(props) => props.theme.border.normal};
`;

export const Divider = ({ width = 0, height = 0 }: Props): ReactElement => {
  return <DividerContainer width={width} height={height} />;
};
