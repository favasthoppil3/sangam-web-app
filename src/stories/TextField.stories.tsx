import { StoryFn, Meta } from '@storybook/react';
import { TextField } from '@mui/material';
import { ComponentProps } from 'react';
import PasswordField from '@/components/shared/PasswordField';

export default {
  title: 'TextField',
  component: TextField,
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args: ComponentProps<typeof TextField>) => <TextField {...args} />;

const PasswordTemplate: StoryFn<typeof PasswordField> = (args: ComponentProps<typeof PasswordField>) => (
  <PasswordField {...args} />
);

export const Outlined = Template.bind({});
Outlined.args = { variant: 'outlined', color: 'primary', placeholder: 'Outlined input' };

export const OutlinedSmall = Template.bind({});
OutlinedSmall.args = { variant: 'outlined', size: 'small', color: 'primary', placeholder: 'Outlined Small input' };

export const Password = PasswordTemplate.bind({});
Password.args = { color: 'primary', placeholder: 'Enter Password' };

export const PasswordWithView = PasswordTemplate.bind({});
PasswordWithView.args = { color: 'primary', placeholder: 'Enter Password', passwordViewable: true };
