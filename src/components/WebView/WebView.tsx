import React from 'react';

interface IProps {
  url: string;
}

export default class WebView extends React.Component<IProps> {
  render() {
    return (
      <webview
        className="vh-100"
        src={this.props.url}
      />
    );
  }
}
