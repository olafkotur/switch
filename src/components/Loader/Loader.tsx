import React from 'react';
import { Zoom } from '@material-ui/core';
// @ts-ignore
import Loading from 'react-loading-components';
import './loader.css';

interface IProps {
  shortLoader: boolean;
}

interface IState {
  showText: boolean;
  showLoader: boolean;
}

export default class Loader extends React.Component<IProps, IState> {
  /**
   * Local properties
   */
  protected color: string;

  /**
   * Loader constructor
   * @param props - component properties
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      showText: !this.props.shortLoader,
      showLoader: this.props.shortLoader,
    };

    // choose random color
    const availableColors = ['#fff', '#B33939', '#227093', '#CCAE62'];
    const random = Math.floor(Math.random() * 5) + 1;
    this.color = availableColors[random - 1];
  }

  /**
   * Component mounting
   */
  public componentDidMount() {
    if (!this.props.shortLoader) {
      setTimeout(
        () => this.setState({ showText: false, showLoader: true }),
        750,
      );
    }
  }

  render() {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <Zoom in={this.state.showText}>
          <div className="d-flex flex-row position-absolute">
            <h1 className="loader-text secondary mr-2">s</h1>
            <h1 className="loader-text primary mr-2">w</h1>
            <h1 className="loader-text primary mr-2">i</h1>
            <h1 className="loader-text primary mr-2">t</h1>
            <h1 className="loader-text tertiary mr-2">c</h1>
            <h1 className="loader-text quaternary mr-2">h</h1>
          </div>
        </Zoom>
        <Zoom in={this.state.showLoader}>
          <div>
            <Loading type="grid" width={80} height={80} fill={this.color} />
          </div>
        </Zoom>
      </div>
    );
  }
}
