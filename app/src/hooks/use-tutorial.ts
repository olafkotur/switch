import { useCallback, useMemo } from 'react';
import { CallBackProps, Step, Styles } from 'react-joyride';
import { useUpdatePreferences } from './use-preferences';
import { useTheme } from './use-theme';

const defaultStepOptions: Partial<Step> = { placement: 'left', showProgress: true, disableBeacon: true };

const steps: Step[] = [
  { target: '.tutorial-step-1', content: 'Click here to add a new application' },
  {
    target: '.tutorial-step-2',
    content: 'Search for any website you may wish to add to Switch e.g. https://notion.so',
  },
  { target: '.tutorial-step-3', content: 'Alternatively, you can add from one of the suggested applications' },
  { target: '.tutorial-step-4', content: 'You can visit the preferences panel for any additional settings' },
];

export const TutorialSteps: Step[] = steps.map((value) => ({ ...defaultStepOptions, ...value }));

export const useTutorial = () => {
  const theme = useTheme();

  const updatePreferences = useUpdatePreferences();

  const options = useMemo(
    (): Styles => ({
      options: {
        zIndex: 7500 + 1, // highest possible component + 1,
        arrowColor: theme.backgroundColor.primary,
        backgroundColor: theme.backgroundColor.primary,
        textColor: theme.color.normal,
      },
      buttonBack: {
        color: theme.color.danger,
      },
      buttonNext: {
        color: theme.color.normal,
        background: 'transparent',
        outline: 'none',
      },
    }),
    [theme],
  );

  const onComplete = useCallback(
    async (data: CallBackProps) => {
      if (data.action !== 'skip' && data.action !== 'reset') return;
      return updatePreferences({ showTutorial: false });
    },
    [updatePreferences],
  );

  return { options, onComplete };
};
