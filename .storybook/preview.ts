import React from 'react';
import type { Preview } from '@storybook/react';
import ThemeProvider from '../src/theme';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'auto',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [
  (Story) => {
    return React.createElement(ThemeProvider, {
      children: React.createElement(Story),
    });
  },
];

export default preview;
