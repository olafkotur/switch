import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH } from '../const';
import { ActiveModuleIdState, ModulesState } from '../state';

const ModuleContainer = styled.div`
  width: calc(100vw - ${SIDE_BAR_WIDTH}px);
  padding: 0 0 0 ${SIDE_BAR_WIDTH}px;
`;

const ModuleWebview = styled('webview')<{ isActive: boolean }>`
  height: 100vh;
  display: ${({ isActive }) => (isActive ? '' : 'none')};
`;

export const ModulePage = (): ReactElement => {
  const modules = useRecoilValue(ModulesState);
  const activeModuleId = useRecoilValue(ActiveModuleIdState);

  return (
    <ModuleContainer>
      {modules.map((module) => (
        <ModuleWebview key={module._id} src={module.url} isActive={module._id === activeModuleId} />
      ))}
    </ModuleContainer>
  );
};
