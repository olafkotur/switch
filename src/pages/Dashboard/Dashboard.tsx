import React from 'react';
import WebView from '../../components/WebView/WebView';
import Menu from '../../components/Menu/Menu';
import Search from '../Search/Search';
import Settings from '../Settings/Settings';
import { IActionRequest, IMenuItem, WebViewAction } from '../../typings/d';
import { MenuService } from '../../services/menu';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import * as _ from 'lodash';
import './dashboard.css';

export type TPages = 'web' | 'search' | 'settings';

const Dashboard = (): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<TPages>('settings');
  const [applications, setApplications] = React.useState<IMenuItem[]>([]);
  const [activeApplication, setActiveApplication] =
    React.useState<IMenuItem | null>(null);
  const [actionRequest, setActionRequest] = React.useState<IActionRequest>({
    id: '',
    action: '',
  });

  const { settings } = useSelector((state: RootState) => state.user);
  const { dialog } = useSelector((state: RootState) => state.interface);

  React.useEffect(() => {
    (async () => {
      setApplications(await MenuService.fetchList());
      setLoading(false);
    })();
  }, []);

  /**
   * Sets the new focused menu item
   * @param action - target page
   * @param menuItem - focused item
   */
  const handleMenuItemClicked = (
    action: TPages,
    menuItem: IMenuItem | null = null,
  ): void => {
    if (action === 'web') {
      setPage(action);
      setActiveApplication(menuItem);
    } else {
      setPage(action);
    }
  };

  /**
   * Handles action request
   * @param id - menu item id
   * @param action - web view action
   */
  const handleActionRequest = (id: string, action: WebViewAction) => {
    setActionRequest({ id, action });
  };

  if (loading) {
    return <></>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="menu bg-secondary"
          style={settings.overlayMode ? { width: 65 } : {}}
        >
          <Menu
            page={page}
            items={applications}
            focusedItem={activeApplication}
            userSettings={settings}
            overlayMode={settings.overlayMode}
            handleClick={handleMenuItemClicked}
            handleRefresh={async () => {}}
            handleActionRequest={handleActionRequest}
            handleDialog={() => {}}
          />
        </div>
        <div className="col p-0">
          {/* these must stay as hidden elements to avoid re-rendering */}
          <div className={`${page !== 'web' ? 'd-none' : ''}`}>
            {applications.map((v) => {
              const hidden = !(
                activeApplication && activeApplication.id === v.id
              );
              return (
                <div key={v.id} className={`${hidden ? 'd-none' : ''}`}>
                  <WebView
                    id={v.id}
                    url={v.url}
                    hidden={hidden}
                    useModifiedAgent={settings.modifiedAgent}
                    defaultWindowBehaviour={settings.windowBehaviour}
                    actionRequest={actionRequest}
                    handleRefresh={async () => {}}
                  />
                </div>
              );
            })}
          </div>

          {page === 'search' && (
            <div className="dashboard-container d-flex justify-content-center">
              <Search items={applications} handleRefresh={async () => {}} />
            </div>
          )}

          {page === 'settings' && (
            <div className="dashboard-container d-flex justify-content-center">
              <Settings />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
