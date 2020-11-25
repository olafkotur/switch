import { BrowserView } from 'electron';
import React from 'react';

interface IProps {
  url: string;
}

export default class WebView extends React.Component<IProps> {
  render() {
    return (
      <webview
        // DANGER: ideally this shouldn't have to be case but here we are
        useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36"
        className="vh-100"
        src={this.props.url}
      />
    );
  }
}
