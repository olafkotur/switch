import styled from 'styled-components';

export const Spacer = styled.div<{ horizontal?: number; vertical?: number }>`
  padding: ${(props) =>
    `${props.vertical ?? 0}px ${props.horizontal ?? 0}px ${props.vertical ?? 0}px ${props.horizontal ?? 0}px`};
`;

export const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%:
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexEndContainer = styled(RowContainer)`
  justify-content: flex-end;
`;

export const SpaceBetweenContainer = styled(RowContainer)`
  width: 100%;
  justify-content: space-between;
`;

export const RelativeContainer = styled.div`
  position: relative;
`;
