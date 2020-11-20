import React from 'react';
import { ISettingConfig } from '../../typings/d';
import { Switch } from '@material-ui/core';

interface IProps extends ISettingConfig {
  handleUpdate: (name: string, value: string) => void;
}

export default class Setting extends React.Component<IProps> {
  render() {
    console.log(this.props);
    return (
      <div className="d-flex flex-row justify-content-between">
        <h5 className="primary">{this.props.label}</h5>
        <Switch
          color="primary"
          checked={this.props.value === 'true'}
          onChange={(_e, checked) => this.props.handleUpdate(this.props.name, checked ? 'true' : 'false')}
        />
      </div>
    );
  }
}
