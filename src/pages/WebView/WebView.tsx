import React from 'react';

interface IProps {
  activeServiceUrl: string;
}

export default class WebView extends React.Component<IProps> {

  render() {
    return (
      <webview
        src={this.props.activeServiceUrl}
        className="vh-100"
      />
    );
  }
}
