import React from 'react';
import { ISelectOption, ISettingConfig } from '../../typings/d';
import { IconButton, Switch } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import './setting.css';

interface IProps extends ISettingConfig {
  handleUpdate: (
    name: string,
    value: string | boolean,
    shouldRefresh: boolean,
    shouldRestart: boolean,
  ) => Promise<void>;
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
    this.props.handleUpdate(
      this.props.name,
      option.value,
      this.props.refresh || false,
      this.props.restart || false,
    );
    this.setState({ selectedOption: option });
  }

  /**
   * Renders setting action
   */
  protected renderAction(): React.ReactElement {
    switch (this.props.type) {
      case 'switch':
        return (
          <Switch
            color="primary"
            checked={!!this.props.value}
            onChange={(_e, checked) =>
              this.props.handleUpdate(
                this.props.name,
                checked,
                this.props.refresh || false,
                this.props.restart || false,
              )
            }
          />
        );
      case 'pop-up':
        return (
          <IconButton
            className="bg-primary mr-2 p-2"
            color="primary"
            onClick={() =>
              this.props.handleChange ? this.props.handleChange() : {}
            }
          >
            <Edit className="primary" fontSize="small" />
          </IconButton>
        );
      default:
        return <></>;
    }
  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center ">
        <div>
          <span className="primary align-self-center">
            {this.props.label}
            {this.props.experimental && (
              <span className="experimental-setting ml-1">experimental</span>
            )}
          </span>
          <p className="text-muted">{this.props.description}</p>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center">
          {this.renderAction()}
        </div>
      </div>
    );
  }
}
