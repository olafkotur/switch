import React from 'react';
import { Button } from '@material-ui/core';
import { IMenuItem, Icon } from '../../typings/d';
import './suggestion.css';

interface IProps extends IMenuItem {
  handleSuggestion: (url: string, icon: Icon) => Promise<void>;
}

export default class Suggestion extends React.Component<IProps> {
  render() {
    return (
      <Button
        className="p-3"
        onClick={() => this.props.handleSuggestion(this.props.url, this.props.icon)}
      >
        <img
          src={this.props.icon}
          className="suggestion-image"
        />
      </Button>
    );
  }
}
