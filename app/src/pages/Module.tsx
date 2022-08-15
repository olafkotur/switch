import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { SIDE_BAR_WIDTH_PX } from '../../../common/const';
import { ActiveModuleState, GroupModuleState } from '../state';

const ModuleContainer = styled.div`
  width: calc(100vw - ${SIDE_BAR_WIDTH_PX}px);
  padding: 0 0 0 ${SIDE_BAR_WIDTH_PX}px;
`;

const ModuleWebview = styled('webview')<{ isActive: boolean }>`
  height: 100vh;
  display: ${({ isActive }) => (isActive ? '' : 'none')};
`;

export const ModulePage = (): ReactElement => {
  const groupModule = useRecoilValue(GroupModuleState);
  const activeModule = useRecoilValue(ActiveModuleState);

  return (
    <ModuleContainer>
      {groupModule.map((module) => (
        <ModuleWebview
          src={module.url}
          isActive={module.id === activeModule?.id}
        />
      ))}
    </ModuleContainer>
  );
};
