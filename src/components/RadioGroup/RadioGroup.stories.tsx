import type { Meta, StoryObj } from '@storybook/react';
import { vstack } from '../../../styled-system/patterns';
import { RadioGroup } from './RadioGroup';

export default {
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  args: {
    id: 'checkbox',
    label: '기본 체크박스',
  },
} satisfies Meta<typeof RadioGroup>;

export const Basic: StoryObj<typeof RadioGroup> = {};

export const Tones: StoryObj<typeof RadioGroup> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: 'gap.sm' })}>
        <RadioGroup
          tone='warning'
          options={[
            { label: 'huey', value: 'Huey' },
            { label: 'dewey', value: 'Dewey' },
          ]}
        />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
    tone: {
      control: false,
    },
  },
};
