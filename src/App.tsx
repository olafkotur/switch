import React from 'react';
import Landing from './pages/Landing/Landing';
import WebView from './pages/WebView/WebView';
import Sidebar from './components/Sidebar/Sidebar';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

interface IState {
  isLoading: boolean;
  activeServiceUrl: string;
}

export default class App extends React.Component<{}, IState> {

  /**
   * App constructor.
   */
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: true,
      activeServiceUrl: '',
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

  protected handleChangeService(url: string) {
    console.log(url);
    this.setState({ activeServiceUrl: url });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="sidebar">
            <Sidebar
              handleChangeService={this.handleChangeService}
            />
          </div>
          <div className="col pl-0">
            <Router>
              <Redirect to={this.state.isLoading ? '/' : '/webview'} />
              <Switch>

                <Route path="/webview">
                  <WebView
                    activeServiceUrl={this.state.activeServiceUrl}
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
