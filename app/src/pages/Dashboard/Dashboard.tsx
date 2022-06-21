import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '../../components/Alert/Alert';
import { Menu } from '../../components/Menu/Menu';
import { WebView } from '../../components/WebView/WebView';
import { MenuService } from '../../services/menu';
import { RootState } from '../../store';
import { IActionRequest, IMenuItem, WebViewAction } from '../../typings/d';
import { Search } from '../Search/Search';
import { Settings } from '../Settings/Settings';
import './dashboard.css';

export type TPages = 'web' | 'search' | 'settings';

export const Dashboard = (): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<TPages>('settings');
  const [applications, setApplications] = React.useState<IMenuItem[]>([]);
  const [activeApplication, setActiveApplication] = React.useState<IMenuItem>();
  const [actionRequest, setActionRequest] = React.useState<IActionRequest>({
    id: '',
    action: '',
  });

  const { settings } = useSelector((state: RootState) => state.user);
  const { error } = useSelector((state: RootState) => state.interface);

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
    menuItem?: IMenuItem,
  ): void => {
    setPage(action);
    action === 'web' && setActiveApplication(menuItem);
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
          style={!settings.overlayMode ? { width: 65 } : {}}
        >
          <Menu
            page={page}
            items={applications}
            focusedItem={activeApplication}
            handleClick={handleMenuItemClicked}
            handleActionRequest={handleActionRequest}
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
                  />
                </div>
              );
            })}
          </div>

          {page === 'search' && (
            <div className="dashboard-container d-flex justify-content-center">
              <Search />
            </div>
          )}

          {page === 'settings' && (
            <div className="dashboard-container d-flex justify-content-center">
              <Settings />
            </div>
          )}

          {error && <Alert />}
        </div>
      </div>
    </div>
  );
};
