import React, { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ColumnContainer, NavigationBar } from '../components';
import { SIDE_BAR_WIDTH } from '../const';
import { ActiveModuleIdState, ModulesState } from '../state';
import { Module } from '../typings';

const ModuleContainer = styled.div`
  width: calc(100vw - ${SIDE_BAR_WIDTH}px);
  padding: 0 0 0 ${SIDE_BAR_WIDTH}px;
`;

export const ModulePage = (): ReactElement => {
  const modules = useRecoilValue(ModulesState);

  return (
    <ModuleContainer>
      {modules.map((mod) => (
        <ModuleWebview key={mod._id} {...mod} />
      ))}
    </ModuleContainer>
  );
};

const Webview = styled('webview')<{ isActive: boolean }>`
  height: 100vh;
  display: ${({ isActive }) => (isActive ? '' : 'none')};
`;

const ModuleWebview = (module: Module): ReactElement => {
  const activeModuleId = useRecoilValue(ActiveModuleIdState);
  const isActive = module._id === activeModuleId;

  return (
    <ColumnContainer>
      {isActive && <NavigationBar module={module} />}
      <Webview id={`webview-${module._id}`} src={module.url} isActive={isActive} />
    </ColumnContainer>
  );
};
