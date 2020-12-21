import React from 'react';
import { UtilService } from '../../services/util';
import { WindowBehaviour, IActionRequest } from '../../typings/d';
import { ElectronService } from '../../services/electron';
import { WebviewTag } from 'electron';

interface IProps {
  id: string;
  url: string;
  hidden: boolean;
  actionRequest: IActionRequest;
  useModifiedAgent: boolean;
  defaultWindowBehaviour: WindowBehaviour;
  handleRefresh: () => Promise<void>;
}

interface IState {
  allowControls: boolean;
}

export default class WebView extends React.Component<IProps, IState> {
  /**
   * Local properties
   */
  protected webView!: WebviewTag;
  protected userAgent: string;

  /**
   * WebView constructor
   * @param props - component prosp
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      allowControls: false,
    };

    // local properties
    this.userAgent = UtilService.getUserAgent();
  }

  /**
   * Component mounting
   */
  componentDidMount(): void {
    this.webView = document.getElementById(`webview-${this.props.id}`) as WebviewTag;

    // enable page controls
    this.webView.addEventListener('dom-ready', () => {
      this.setState({ allowControls: true });
    });

    // handle new windows
    this.webView.addEventListener('new-window', async (e): Promise<void> => {
      if (e.url) {
        // override to open as 'window' in special cases
        const isWindow = e.disposition && e.disposition === 'new-window';
        const shouldRefresh = await ElectronService.openHyperlink(e.url, isWindow ? 'window' : this.props.defaultWindowBehaviour);
        shouldRefresh && this.props.handleRefresh();
      }
    });
  }

  /**
   * Component update
   * @param prevProps - previous properties
   */
  componentDidUpdate(prevProps: IProps) {
    if (this.state.allowControls && this.props.actionRequest.id === this.props.id
      && prevProps.actionRequest !== this.props.actionRequest
    ) {
      switch (this.props.actionRequest.action) {
        case 'back':
          this.webView.goBack();
          break;
        case 'forward':
          this.webView.goForward();
          break;
        case 'refresh':
          this.webView.reload();
          break;
      }
    }
  }

  render() {
    return (
      <webview
        id={`webview-${this.props.id}`}
        src={this.props.url}
        className={`vh-100 ${this.props.hidden ? 'd-none' : ''}`}
        useragent={this.props.useModifiedAgent ? this.userAgent : undefined}
      />
    );
  }
}
