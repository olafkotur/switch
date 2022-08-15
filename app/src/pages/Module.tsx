import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH_PX } from '../../../common/const';
import { ModuleState } from '../state';

const ModuleContainer = styled.div`
  width: calc(100vw - ${SIDE_BAR_WIDTH_PX}px);
  padding: 0 0 0 ${SIDE_BAR_WIDTH_PX}px;
`;

const ModuleWebview = styled('webview')`
  height: 100vh;
`;

export const ModulePage = (): ReactElement => {
  const module = useRecoilValue(ModuleState);

  return (
    <ModuleContainer>
      <ModuleWebview src={module.url} />
    </ModuleContainer>
  );
};
