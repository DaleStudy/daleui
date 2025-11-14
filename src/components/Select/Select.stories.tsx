import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/internal/actions";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { vstack } from "../../../styled-system/patterns";
import { Select } from "./Select";
import { Button } from "../Button/Button";

export default {
  component: Select.Root,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit",
    },
  },
  args: {
    disabled: false,
    required: false,
    invalid: false,
    clearable: false,
  },
  argTypes: {},
} satisfies Meta<typeof Select.Root>;

type Story = StoryObj<typeof Select.Root>;

/**
 * 가장 기본적인 Select 컴포넌트입니다.
 * placeholder를 통해 사용자에게 안내할 수 있습니다.
 */
export const Default: Story = {
  render: (args) => (
    <div className={css({ w: "320px" })}>
      <Select.Root {...args}>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

/**
 * `defaultValue` prop을 사용하여 초기값을 설정할 수 있습니다.
 */
export const WithDefaultValue: Story = {
  render: (args) => (
    <div className={css({ w: "320px" })}>
      <Select.Root {...args} defaultValue="vue">
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  argTypes: {
    defaultValue: {
      control: false,
    },
  },
};

/**
 * `useState`와 함께 `value`, `onValueChange` prop을 사용하여 제어 컴포넌트로 만들 수 있습니다.
 */
const ControlledSelect = () => {
  const [value, setValue] = useState<string | undefined>("react");

  return (
    <div className={css({ w: "320px" })}>
      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>
      <div className={css({ mt: "16", fontSize: "sm" })}>
        <p>선택된 값: {value || "없음"}</p>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledSelect />,
  argTypes: {
    value: { control: false },
    onValueChange: { control: false },
  },
};

/**
 * `disabled` prop을 `true`로 설정하면 선택이 비활성화됩니다.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className={vstack({ gap: "16", w: "320px" })}>
      <Select.Root {...args} defaultValue="react">
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>
      <Select.Root {...args}>
        <Select.Trigger placeholder="비활성화된 선택" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
        </Select.Content>
      </Select.Root>

      <Select.Root {...args} disabled={false}>
        <Select.Trigger placeholder="일부 옵션을 disabled" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue" disabled>
            Vue
          </Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
          <Select.Item value="angular" disabled>
            Angular
          </Select.Item>
          <Select.Item value="solid">Solid</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  argTypes: {
    disabled: {
      control: false,
    },
  },
};

/**
 * `invalid` prop을 `true`로 설정하여 오류 상태를 시각적으로 표현할 수 있습니다.
 */
export const Invalid: Story = {
  args: {
    invalid: true,
  },
  render: (args) => (
    <div className={css({ w: "320px" })}>
      <Select.Root {...args}>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  argTypes: {
    invalid: {
      control: false,
    },
  },
};

/**
 * `required` prop을 `true`로 설정하면 필수 입력임을 나타냅니다.
 */
const RequiredSelect = (args: React.ComponentProps<typeof Select.Root>) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const isValid = form.checkValidity();
    setIsInvalid(!isValid);
    action("form-submit")(`선택된 값: ${form.framework.value || "없음"}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={css({ w: "320px", spaceY: "16" })}
    >
      <Select.Root {...args} invalid={isInvalid} name="framework" clearable>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요." />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>
      {isInvalid && (
        <div className={css({ mt: "16", fontSize: "sm", color: "fg.danger" })}>
          <p>필수 항목을 선택해주세요.</p>
        </div>
      )}
      <Button type="submit">제출</Button>
    </form>
  );
};

export const Required: Story = {
  args: {
    required: true,
  },
  render: (args) => <RequiredSelect {...args} />,
  argTypes: {
    required: {
      control: false,
    },
  },
};

/**
 * `clearable` prop을 `true`로 설정하면 선택된 값이 있을 때 지우기 버튼이 표시됩니다.
 */
export const Clearable: Story = {
  args: {
    clearable: true,
  },
  render: (args) => (
    <div className={vstack({ gap: "16", w: "320px" })}>
      <Select.Root {...args}>
        <Select.Trigger placeholder="값이 없을 때는 버튼이 안 보입니다" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  argTypes: {
    clearable: {
      control: false,
    },
  },
};

/**
 * 많은 옵션을 가진 Select 컴포넌트입니다.
 */
export const WithManyOptions: Story = {
  render: (args) => (
    <div className={css({ w: "320px" })}>
      <Select.Root {...args}>
        <Select.Trigger placeholder="국가를 선택하세요" />
        <Select.Content>
          <Select.Item value="kr">대한민국</Select.Item>
          <Select.Item value="us">미국</Select.Item>
          <Select.Item value="jp">일본</Select.Item>
          <Select.Item value="cn">중국</Select.Item>
          <Select.Item value="gb">영국</Select.Item>
          <Select.Item value="fr">프랑스</Select.Item>
          <Select.Item value="de">독일</Select.Item>
          <Select.Item value="it">이탈리아</Select.Item>
          <Select.Item value="es">스페인</Select.Item>
          <Select.Item value="ca">캐나다</Select.Item>
          <Select.Item value="au">호주</Select.Item>
          <Select.Item value="br">브라질</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const OverflowText: Story = {
  render: (args) => (
    <div className={css({ w: "320px" })}>
      <Select.Root {...args}>
        <Select.Trigger placeholder="Overflow placeholder text will be shown on hover" />
        <Select.Content>
          <Select.Item value="react">
            React is a JavaScript library for building user interfaces.
          </Select.Item>
          <Select.Item value="vue">
            Vue is a progressive framework for building user interfaces.
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};
