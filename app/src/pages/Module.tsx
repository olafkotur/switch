import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH } from '../const';
import { ActiveModuleIdState, GroupModuleState } from '../state';

const ModuleContainer = styled.div`
  width: calc(100vw - ${SIDE_BAR_WIDTH}px);
  padding: 0 0 0 ${SIDE_BAR_WIDTH}px;
`;

const ModuleWebview = styled('webview')<{ isActive: boolean }>`
  height: 100vh;
  display: ${({ isActive }) => (isActive ? '' : 'none')};
`;

export const ModulePage = (): ReactElement => {
  const groupModule = useRecoilValue(GroupModuleState);
  const activeModuleId = useRecoilValue(ActiveModuleIdState);

  return (
    <ModuleContainer>
      {groupModule.map((module) => (
        <ModuleWebview key={module.id} src={module.url} isActive={module.id === activeModuleId} />
      ))}
    </ModuleContainer>
  );
};
