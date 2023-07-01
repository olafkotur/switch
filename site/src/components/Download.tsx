import React, { ReactElement, useCallback, useState } from 'react';
import { DOWNLOAD_URL } from '../const';
import { useTheme, useToast } from '../hooks';
import { LargeButton } from './Button';
import { Spacer } from './Common';
import { Icon, IconNames } from './Icon';
import { MediumLink } from './Text';

export const Download = ({ expanded }: { expanded?: boolean }): ReactElement => {
  const [disabled, setDisabled] = useState(false);

  const theme = useTheme();
  const successToast = useToast('success');

  const handleDownload = useCallback(() => {
    setDisabled(true);
    successToast('Download will start shortly');

    setTimeout(() => {
      setDisabled(false);
    }, 5000);
  }, [successToast]);

  return (
    <LargeButton
      bg={theme.highlightColor.secondary}
      width={expanded ? '190px' : undefined}
      disabled={disabled}
      onClick={handleDownload}
    >
      <Icon name={IconNames.DOWNLOAD} size={14} color={theme.color.white} />
      <Spacer horizontal={2} />
      <MediumLink cursor="pointer" color={theme.color.white} href={DOWNLOAD_URL} underline={false}>
        {expanded ? 'MacOS Intel & Silicon' : 'Download'}
      </MediumLink>
    </LargeButton>
  );
};
