import React from 'react';
import { UtilService } from '../../services/util';
import { IActionRequest } from '../../typings/d';

interface IProps {
  id: string;
  url: string;
  hidden: boolean;
  actionRequest: IActionRequest;
  useModifiedAgent: boolean;
}

interface IState {
  allowControls: boolean;
}

export default class WebView extends React.Component<IProps, IState> {
  /**
   * Local properties
   */
  // many of the functions for the webview do not exist on type Element hence the any type declaration
  // tslint:disable-next-line: no-any
  protected webView: any | null = null;
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
  componentDidMount() {
    this.webView = document.getElementById(`webview-${this.props.id}`);
    this.webView && this.webView.addEventListener('dom-ready', () => {
      this.setState({ allowControls: true });
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
