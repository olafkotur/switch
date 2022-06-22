import { IPreset, IScreenInfo } from '../typings/user';
import { ElectronService } from './electron';

export const PresetService = {
  /**
   * Returns the default preset settings
   */
  fetch: (sInfo?: IScreenInfo): IPreset[] => {
    const screenSize = sInfo || ElectronService.getScreenInfo(true);
    return [
      {
        name: 'Full Screen',
        width: screenSize.width,
        height: screenSize.height,
        xPosition: 0,
        yPosition: 0,
        preview: { width: 100, height: 100, xOffset: 0, yOffset: 0 },
      },
      {
        name: 'Two Thirds (left)',
        width: screenSize.width * 0.65,
        height: screenSize.height,
        xPosition: 0,
        yPosition: 0,
        preview: { width: 66.66, height: 100, xOffset: 0, yOffset: 0 },
      },
      {
        name: 'Left Side',
        width: screenSize.width * 0.5,
        height: screenSize.height,
        xPosition: 0,
        yPosition: 0,
        preview: { width: 50, height: 100, xOffset: 0, yOffset: 0 },
      },
      {
        name: 'Two Thirds (right)',
        width: screenSize.width * 0.65,
        height: screenSize.height,
        xPosition: screenSize.width * 0.35,
        yPosition: 0,
        preview: { width: 66.66, height: 100, xOffset: 33.33, yOffset: 0 },
      },
      {
        name: 'Right Side',
        width: screenSize.width * 0.5,
        height: screenSize.height,
        xPosition: screenSize.width * 0.5,
        yPosition: 0,
        preview: { width: 50, height: 100, xOffset: 50, yOffset: 0 },
      },
    ];
  },

  /**
   * Active preset setting.
   * @param width - window width
   * @param height - window height
   * @param xPosition - window x position
   * @param yPosition - window y position
   * @param animate - true to animate the resposition
   * @param windowPadding - true to add padding around the sides
   */
  active: async (
    width: number,
    height: number,
    xPosition: number,
    yPosition: number,
    animate: boolean,
    windowPadding: boolean,
  ): Promise<void> => {
    const windowInfo = {
      width: Math.round(width),
      height: Math.round(height),
      xPosition: Math.round(xPosition),
      yPosition: Math.round(yPosition),
    };
    return new Promise((resolve) => {
      ElectronService.setWindowInfo(
        undefined,
        windowInfo,
        animate,
        windowPadding,
      );
      resolve();
    });
  },
};
