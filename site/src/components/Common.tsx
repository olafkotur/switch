import styled from 'styled-components';

export const Spacer = styled.div<{ horizontal?: number; vertical?: number }>`
  padding: ${(props) =>
    `${props.vertical ?? 0}px ${props.horizontal ?? 0}px ${props.vertical ?? 0}px ${props.horizontal ?? 0}px`};
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
