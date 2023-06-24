import React, { ReactElement, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useTheme, useToast } from '../hooks';
import { DownloadingState } from '../state';
import { LargeButton } from './Button';
import { Spacer } from './Common';
import { Icon, IconNames } from './Icon';
import { MediumText } from './Text';

export const Download = ({ expanded }: { expanded?: boolean }): ReactElement => {
  const [isDownloading, setIsDownloading] = useRecoilState(DownloadingState);

  const theme = useTheme();
  const successToast = useToast('success');

  const onDownload = useCallback(() => {
    setIsDownloading(true);
    successToast('Download started');

    setTimeout(() => {
      setIsDownloading(false);
    }, 5000);
  }, [successToast]);

  return (
    <LargeButton
      bg={theme.highlightColor.secondary}
      width={expanded ? '190px' : undefined}
      disabled={isDownloading}
      onClick={onDownload}
    >
      <Icon name={IconNames.DOWNLOAD} size={14} color={theme.color.white} />
      <Spacer horizontal={2} />
      <MediumText cursor="pointer" color={theme.color.white}>
        {expanded ? 'MacOS Intel & Silicon' : 'Download'}
      </MediumText>
    </LargeButton>
  );
};
