import { WebviewTag } from 'electron';
import React from 'react';
import { ElectronService } from '../../../services/electron';
import { UtilService } from '../../../services/util';
import { IActionRequest, WindowBehaviour } from '../../../typings/d';

interface IProps {
  id: string;
  url: string;
  hidden: boolean;
  actionRequest: IActionRequest;
  useModifiedAgent: boolean;
  defaultWindowBehaviour: WindowBehaviour;
}

interface IState {
  allowControls: boolean;
}

export class WebView extends React.Component<IProps, IState> {
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
    this.userAgent = UtilService.getUserAgent(this.props.url);
  }

  /**
   * Component mounting
   */
  componentDidMount(): void {
    this.webView = document.getElementById(
      `webview-${this.props.id}`,
    ) as WebviewTag;

    // enable page controls
    this.webView.addEventListener('dom-ready', () => {
      this.setState({ allowControls: true });
    });

    // handle new windows
    this.webView.addEventListener('new-window', async (e): Promise<void> => {
      if (e.url) {
        // override to open as 'window' in special cases
        const override = e.disposition === 'new-window';

        // open hyperlink using set behaviour
        await ElectronService.openHyperlink(
          e.url,
          override ? 'window' : this.props.defaultWindowBehaviour,
        );
      }
    });
  }

  /**
   * Component update
   * @param prevProps - previous properties
   */
  componentDidUpdate(prevProps: IProps) {
    if (
      this.state.allowControls &&
      this.props.actionRequest.id === this.props.id &&
      prevProps.actionRequest !== this.props.actionRequest
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
