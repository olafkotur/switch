import React from 'react';
import { ISettingConfig } from '../../typings/d';
import { Button, Switch, Tooltip } from '@material-ui/core';
import './setting.css';

interface IProps extends ISettingConfig {
  handleUpdate: (name: string, value: string, restart?: boolean) => Promise<void>;
  handleClick: (name: string) => Promise<void>;
}

export default class GeneralSetting extends React.Component<IProps, IState> {
  protected renderType(): React.ReactElement {
    switch (this.props.type) {
      case 'switch':
        return <Switch
          color="primary"
          checked={this.props.value === 'true'}
          onChange={(_e, checked) => this.props.handleUpdate(this.props.name, checked ? 'true' : 'false', this.props.restart)}
        />;
      case 'button':
        return <Button
          variant="contained"
          className="setting-button"
          color="primary"
          onClick={() => this.props.handleClick(this.props.name)}
        >
          <span className="primary setting-button-text">{this.props.action || 'change'}</span>
        </Button>;
      case 'custom':
        return this.props.custom || <></>;
      default:
        return <></>;
    }
  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-between mt-2">
        <h5 className="primary">{this.props.label}</h5>
        <Tooltip title={this.props.hover || ''}>
          { this.renderType() }
        </Tooltip>
      </div>
    );
  }
}
