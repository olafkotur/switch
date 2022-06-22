import { FontFamily, WindowBehaviour } from '../typings/user'

export const accentColors: string[] = [
  '#b33939',
  '#227093',
  '#ccae62',
  '#7e9181',
  '#40407a',
]

export const fontFamilies: FontFamily[] = [
  'Arial',
  'Verdana',
  'Helvetica',
  'Courier New',
  'Times New Roman',
]

export const windowBehaviours: { value: WindowBehaviour; label: string }[] = [
  { value: 'external', label: 'Open in default browser' },
  { value: 'window', label: 'Open a new window' },
  { value: 'within', label: 'Create a new Switch tab' },
]
