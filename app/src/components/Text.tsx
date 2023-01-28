import styled from 'styled-components';

interface TextProps {
  faint?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  cursor?: string;
}

export const Text = styled.span<TextProps>`
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
  text-decoration: ${(props) => (props.underline ? 'underline' : '')};
  color: ${(props) => {
    if (props.color) {
      return props.color;
    }
    return props.faint ? props.theme.color.faint : props.theme.color.normal;
  }};
  cursor: ${(props) => props.cursor ?? 'auto'};
`;

export const VeryLargeText = styled(Text)`
  font-size: ${(props) => props.theme.fontSize.veryLarge};
`;

export const LargeText = styled(Text)`
  font-size: ${(props) => props.theme.fontSize.large};
`;

export const MediumText = styled(Text)`
  font-size: ${(props) => props.theme.fontSize.medium};
`;

export const SmallText = styled(Text)`
  font-size: ${(props) => props.theme.fontSize.small};
`;
