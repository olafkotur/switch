import styled from 'styled-components';

interface TextProps {
  faint?: boolean;
  bold?: boolean;
  italic?: boolean;
  cursor?: string;
}

export const Text = styled.span<TextProps>`
  font-weight: ${(props) => (props.bold ? '600' : '400')};
  font-style: ${(props) => (props.italic ? 'italic' : 'normal')};
  color: ${(props) => {
    if (props.color) {
      return props.color;
    }
    return props.faint ? props.theme.color.faint : props.theme.color.normal;
  }};
  cursor: ${(props) => props.cursor ?? 'auto'};
`;

export const TitleText = styled(Text)`
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSize.veryLarge};
`;

export const SubtitleText = styled(Text)`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSize.large};
`;

export const BodyText = styled(Text)`
  font-size: ${(props) => props.theme.fontSize.medium};
`;

export const SmallText = styled(Text)`
  font-size: ${(props) => props.theme.fontSize.small};
`;
