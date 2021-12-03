import React from 'react';
import { ButtonBase, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { PresetService } from '../../services/preset';
import { RootState } from '../../store';
import { IPreset } from '../../typings/user';
import './preset.css';

interface IProps extends IPreset {}

const Preset = ({
  name,
  width,
  height,
  xPosition,
  yPosition,
  preview,
}: IProps): React.ReactElement => {
  const [focused, setFocused] = React.useState<boolean>(false);

  const { settings } = useSelector((state: RootState) => state.user);

  /**
   * Handles set active preset
   */
  const handleActive = async (): Promise<void> => {
    await PresetService.active(
      width,
      height,
      xPosition,
      yPosition,
      settings.animatePresets,
      settings.windowPadding,
    );
  };

  return (
    <ButtonBase
      className="col-xl-3 col-lg-4 col-md-6 p-2"
      onClick={handleActive}
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
    >
      <Paper className="d-flex preset-outer p-1 bg-primary align-items-center w-100">
        {focused && (
          <p className="primary position-absolute w-100 text-center">{name}</p>
        )}
        <div
          className="position-static preset-inner"
          style={{
            width: `${preview.width}%`,
            height: `${preview.height}%`,
            marginLeft: `${preview.xOffset}%`,
            marginTop: `${preview.yOffset}%`,
          }}
        />
      </Paper>
    </ButtonBase>
  );
};

export default Preset;
