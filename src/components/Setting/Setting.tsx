import React from 'react';
import { ISettingConfig } from '../../typings/d';
import { Button, Switch } from '@material-ui/core';

interface IProps extends ISettingConfig {
  handleUpdate: (name: string, value?: string) => void;
}

export default class Setting extends React.Component<IProps> {

  protected renderType(): React.ReactElement {
    switch (this.props.type) {
      case 'switch':
        return <Switch
          color="primary"
          checked={this.props.value === 'true'}
          onChange={(_e, checked) => this.props.handleUpdate(this.props.name, checked ? 'true' : 'false')}
        />;
      case 'button':
        return <Button
          disableElevation
          variant="contained"
          className="setting-button"
          onClick={() => this.props.handleUpdate(this.props.name)}
        >
          <span className="primary setting-button-text">{this.props.action || 'change'}</span>
        </Button>;
      default:
        return <Button></Button>;
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="d-flex flex-row justify-content-between">
        <h5 className="primary">{this.props.label}</h5>
        { this.renderType() }
      </div>
    );
  }
}
