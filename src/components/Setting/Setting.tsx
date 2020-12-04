import React from 'react';
import { ISelectOption, ISettingConfig } from '../../typings/d';
import { Button, Chip, MenuItem, Select, Switch, Tooltip } from '@material-ui/core';
import './setting.css';

interface IProps extends ISettingConfig {
  handleUpdate: (name: string, value: string, restart?: boolean) => Promise<void>;
  handleClick: (name: string) => Promise<void>;
}

interface IState {
  selectedOption: ISelectOption | null;
}

export default class Setting extends React.Component<IProps, IState> {

  /**
   * Setting constructor
   * @param props - component properties
   */
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedOption: null,
    };
  }

  /**
   * Handles select change
   * @param option - select option
   */
  protected handleSelectChange(option: ISelectOption) {
    this.props.handleUpdate(this.props.name, option.value);
    this.setState({ selectedOption: option });
  }

  /**
   * Renders setting type
   */
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
          <span className="primary">{this.props.action || 'change'}</span>
        </Button>;
      case 'select':
        return <Select
          disableUnderline
          value={this.props.value}
          className="setting-select"
          MenuProps={{ MenuListProps: { style: { background: '#1F2225' } } } }
          onChange={e => this.handleSelectChange({ value: e.target.value as string || '', label: e.target.name as string || '' })}
          renderValue={selected => <Chip label={this.props.values?.find(v => v.value === selected)?.label} color="primary" />}
          IconComponent={() => <></>}
        >
          {this.props.values && this.props.values.map((v, i) => (
            <MenuItem
              value={v.value}
              key={`setting-select-${i}`}
              className="bg-secondary primary"
            >
              <span className="primary">{v.label}</span>
            </MenuItem>
          ))}
        </Select>;
      default:
        return this.props.custom || <Select></Select>;
    }
  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-between mt-2">
        <h5 className="primary align-self-center">{this.props.label}</h5>
        <Tooltip title={this.props.hover || ''}>
          { this.renderType() }
        </Tooltip>
      </div>
    );
  }
}
