import React from 'react';
import { ISelectOption, ISettingConfig } from '../../typings/d';
import { IconButton, Switch } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import './setting.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSettings } from '../../redux/user';
import { RootState } from '../../store';

interface IProps extends ISettingConfig {
  handleChange: (name: string, value: any) => void;
}

const Setting = ({
  type,
  label,
  description,
  experimental,
  name,
  value,
  customHandler,
  handleChange,
  CustomIcon,
}: IProps): React.ReactElement => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.user.settings);

  /**
   * Renders setting action
   */
  const renderComponent = (): React.ReactElement => {
    switch (type) {
      case 'switch':
        return (
          <Switch
            color="primary"
            checked={!!value}
            onChange={(_e, checked) => handleChange(name, checked)}
          />
        );
      case 'pop-up':
        const Icon = CustomIcon || Edit;
        return (
          <IconButton
            className="bg-primary mr-2 p-2"
            color="primary"
            onClick={() => (customHandler ? customHandler() : {})}
          >
            <Icon className="primary" fontSize="small" />
          </IconButton>
        );
      default:
        return <></>;
    }
  };
  return (
    <div className="d-flex flex-row justify-content-between align-items-center ">
      <div>
        <span className="primary align-self-center">
          {label}
          {experimental && (
            <span className="experimental-setting ml-1">experimental</span>
          )}
        </span>
        <p className="text-muted">{description}</p>
      </div>
      <div className="d-flex flex-row justify-content-center align-items-center">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Setting;
