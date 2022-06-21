import { IconButton, makeStyles, Switch } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import Stylesheet from 'reactjs-stylesheet';
import { RootState } from '../../../store';
import { ISettingConfig } from '../../../typings/d';

interface IProps extends ISettingConfig {
  handleChange: (name: string, value: any) => void;
}

export const Setting = ({
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
  const { settings } = useSelector((state: RootState) => state.user);

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
            className="mr-2 p-2"
            classes={makeStyles({
              root: {
                backgroundColor: '#303136',
                '&:hover': {
                  backgroundColor: settings.accentColor,
                },
              },
            })()}
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
            <span className="ml-1" style={styles.experimentalSetting}>
              experimental
            </span>
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

const styles = Stylesheet.create({
  experimentalSetting: {
    backgroundColor: '#303136',
    color: '#eb4d4b',
    fontSize: 12,
    borderRadius: 15,
    padding: 3,
    paddingLeft: 8,
    paddingRight: 8,
  },
});