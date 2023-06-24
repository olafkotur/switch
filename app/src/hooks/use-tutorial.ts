import { useCallback, useMemo } from 'react';
import { CallBackProps, Step, Styles } from 'react-joyride';
import { useUpdatePreferences } from './use-preferences';
import { useTheme } from './use-theme';

const defaultStepOptions: Partial<Step> = { placement: 'left', showProgress: true, disableBeacon: true };

const steps: Step[] = [
  { target: '.tutorial-step-1', content: 'Click the button to add a new application.' },
  {
    target: '.tutorial-step-2',
    content: 'Search for any website you want to add, like https://notion.so.',
  },
  { target: '.tutorial-step-3', content: 'Or, choose from our suggested applications.' },
  {
    target: '.tutorial-step-4',
    content: 'Need an invite? Send one to your friends here.',
  },
  { target: '.tutorial-step-5', content: 'Lastly, check out the preferences panel for more settings.' },
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
