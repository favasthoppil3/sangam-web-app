import { StoryFn, Meta } from '@storybook/react';
import { Button } from '@mui/material';
import { ComponentProps } from 'react';

export default {
  title: 'Button',
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args: ComponentProps<typeof Button>) => <Button {...args} />;

export const Contained = Template.bind({});
Contained.args = { variant: 'contained', color: 'primary', children: 'Contained Button' };

export const Outlined = Template.bind({});
Outlined.args = { variant: 'outlined', color: 'primary', children: 'Outlined Button' };

export const Text = Template.bind({});
Text.args = { variant: 'text', color: 'primary', children: 'Text Button' };

export const LargePrimaryButton = Template.bind({});
LargePrimaryButton.args = { variant: 'contained', color: 'primary', size: 'large', children: 'Large Button' };
