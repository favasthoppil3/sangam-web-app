import { create } from '@storybook/theming';

export default create({
  base: 'dark',
  brandTitle: 'Sangam',
  // brandUrl: 'http://passdaily.in',
  brandImage: 'sangam-logo.png',
  brandTarget: '_blank',

  // UI
  appBg: '#121212',
  appContentBg: '#121212',
  appBorderColor: 'grey',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#ffff',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'silver',
  barSelectedColor: 'black',
  barBg: 'hotpink',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,
});
