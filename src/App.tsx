import React from 'react';
import Landing from './pages/Landing/Landing';
import WebView from './pages/WebView/WebView';
import Sidebar from './components/Sidebar/Sidebar';
import { render } from 'react-dom';
import { ISidebarItem } from './typings/component';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './global.css';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

interface IState {
  isLoading: boolean;
  activeSidebar: ISidebarItem | null;
}

export default class App extends React.Component<{}, IState> {

  /**
   * App constructor.
   */
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: true,
      activeSidebar: null,
    };

    // scope binding
    this.handleChangeService = this.handleChangeService.bind(this);
  }

  /**
   * Component mounting.
   */
  public componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000);
  }

  protected handleChangeService(activeSidebar: ISidebarItem) {
    this.setState({ activeSidebar });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="sidebar">
            <Sidebar
              activeSidebar={this.state.activeSidebar}
              handleChangeService={this.handleChangeService}
            />
          </div>
          <div className="col pl-0">
            <Router>
              <Redirect to={this.state.isLoading ? '/' : '/webview'} />
              <Switch>

                <Route path="/webview">
                  <WebView
                    activeSidebarUrl={this.state.activeSidebar ? this.state.activeSidebar.url : ''}
                  />
                </Route>

                <Route path="/">
                  <Landing />
                </Route>

              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, mainElement);
