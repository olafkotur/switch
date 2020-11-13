import React from 'react';

interface IProps {
  activeSidebarUrl: string;
}

export default class WebView extends React.Component<IProps> {

  render() {
    return (
      <webview
        src={this.props.activeSidebarUrl}
        className="vh-100"
      />
    );
  }
}
