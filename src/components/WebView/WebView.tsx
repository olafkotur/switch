import React from 'react';
import { UtilService } from '../../services/util';

interface IProps {
  url: string;
  useModifiedAgent: boolean;
}

export default class WebView extends React.Component<IProps> {
  /**
   * Local properties
   */
  protected userAgent: string;

  /**
   * WebView constructor
   * @param props - component prosp
   */
  constructor(props: IProps) {
    super(props);

    // local properties
    this.userAgent = UtilService.getUserAgent();
  }

  render() {
    return (
      <webview
        className="vh-100"
        src={this.props.url}
        useragent={this.props.useModifiedAgent ? this.userAgent : undefined}
      />
    );
  }
}
