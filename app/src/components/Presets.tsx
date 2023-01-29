import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { PRESET_CONFIG } from '../const';
import { Button } from './Button';

const PresetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${(props) => props.theme.spacing.medium};
`;

const Preset = styled(Button)`
  display: flex;
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${(props) => props.theme.backgroundColor.primary};
  border-radius: ${(props) => props.theme.borderRadius.medium};
`;

const PresetInner = styled.div<{ width: string }>`
  position: absolute;
  top: 5px;
  left: 5px;
  width: calc(${(props) => props.width} - ${(props) => props.theme.spacing.medium});
  height: calc(100% - ${(props) => props.theme.spacing.medium});
  background: ${(props) => props.theme.backgroundColor.faint};
  border-radius: ${(props) => props.theme.borderRadius.small};
`;

export const Presets = (): ReactElement => {
  return (
    <PresetsContainer>
      {PRESET_CONFIG.map((width) => (
        <Preset>
          <PresetInner width={width} />
        </Preset>
      ))}
    </PresetsContainer>
  );
};
