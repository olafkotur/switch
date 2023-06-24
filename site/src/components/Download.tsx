import React, { ReactElement, useCallback } from 'react';
import { useTheme } from '../hooks';
import { LargeButton } from './Button';
import { Spacer } from './Common';
import { Icon, IconNames } from './Icon';
import { MediumText } from './Text';

export const Download = ({ expanded }: { expanded?: boolean }): ReactElement => {
  const theme = useTheme();

  const onDownload = useCallback(() => {
    console.log('onDownload');
  }, []);

  return (
    <LargeButton bg={theme.highlightColor.secondary} width={expanded ? '190px' : undefined} onClick={onDownload}>
      <Icon name={IconNames.DOWNLOAD} size={14} />
      <Spacer horizontal={2} />
      <MediumText>{expanded ? 'MacOS Intel & Silicon' : 'Download'}</MediumText>
    </LargeButton>
  );
};
