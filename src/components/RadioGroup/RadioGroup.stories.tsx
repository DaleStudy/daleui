import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { Radio, RadioGroup } from "./RadioGroup";
import { VStack } from "../VStack/VStack";

export default {
  component: RadioGroup,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=6739-1266",
    },
  },
  args: {
    name: "fruits",
    label: "좋아하는 과일을 선택하세요",
    children: (
      <>
        <Radio value="apple">사과</Radio>
        <Radio value="banana">바나나</Radio>
        <Radio value="orange">오렌지</Radio>
      </>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof RadioGroup>;

type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "banana",
  },
};

export const Orientation: Story = {
  render: (args) => {
    return (
      <div
        className={css({ display: "flex", flexDirection: "column", gap: "32" })}
      >
        <RadioGroup
          {...args}
          name="vertical-orientation"
          label="세로 방향 (Vertical)"
          orientation="vertical"
          defaultValue="apple"
        />

        <RadioGroup
          {...args}
          name="horizontal-orientation"
          label="가로 방향 (Horizontal)"
          orientation="horizontal"
          defaultValue="banana"
        />
      </div>
    );
  },
  argTypes: {
    name: {
      control: false,
    },
    label: {
      control: false,
    },
    orientation: {
      control: false,
    },
    defaultValue: {
      control: false,
    },
  },
};

export const GroupDisabled: Story = {
  args: {
    disabled: true,
    defaultValue: "banana",
    label: "전체 그룹 비활성화",
  },
};

export const ItemDisabled: Story = {
  render: () => {
    return (
      <div
        className={css({ display: "flex", flexDirection: "column", gap: "32" })}
      >
        <RadioGroup
          name="disabled-checked"
          label="개별 아이템 비활성화 (선택됨)"
          defaultValue="banana"
        >
          <Radio value="apple">사과</Radio>
          <Radio value="banana" disabled>
            바나나 (disabled)
          </Radio>
          <Radio value="orange">오렌지</Radio>
        </RadioGroup>

        <RadioGroup
          name="disabled-unchecked"
          label="개별 아이템 비활성화 (선택 안 됨)"
          defaultValue="apple"
        >
          <Radio value="apple">사과</Radio>
          <Radio value="banana" disabled>
            바나나 (disabled)
          </Radio>
          <Radio value="orange">오렌지</Radio>
        </RadioGroup>
      </div>
    );
  },
};

export const Tones: Story = {
  render: (args) => {
    return (
      <div
        className={css({ display: "flex", flexDirection: "column", gap: "32" })}
      >
        <RadioGroup
          {...args}
          name="neutral-tone"
          label="중립 색조 (Neutral)"
          tone="neutral"
        />

        <RadioGroup
          {...args}
          name="brand-tone"
          label="브랜드 색조 (Brand)"
          tone="brand"
        />
      </div>
    );
  },
  argTypes: {
    name: {
      control: false,
    },
    label: {
      control: false,
    },
    tone: {
      control: false,
    },
  },
  args: {
    defaultValue: "apple",
  },
};

export const Controlled = () => {
  const [value, setValue] = useState("apple");
  return (
    <div>
      <RadioGroup
        name="controlled-fruits"
        label="제어 컴포넌트 예시"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Radio value="apple">사과</Radio>
        <Radio value="banana">바나나</Radio>
        <Radio value="orange">오렌지</Radio>
      </RadioGroup>
      <div className={css({ marginTop: "20" })}>
        <p>현재 선택된 값: {value}</p>
        <button onClick={() => setValue("banana")}>바나나 선택</button>
        <button onClick={() => setValue("orange")}>오렌지 선택</button>
      </div>
    </div>
  );
};

export const Invalid: Story = {
  render: (args) => {
    return (
      <VStack gap="32">
        <RadioGroup
          {...args}
          name="invalid-unselected"
          label="에러 상태 (선택 없음)"
          invalid
          helperText="필수 값을 선택해주세요."
        />

        <RadioGroup
          {...args}
          name="invalid-selected"
          label="에러 상태 (선택됨)"
          invalid
          helperText="올바른 옵션을 선택해주세요."
          defaultValue="banana"
        />

        <RadioGroup
          {...args}
          name="normal"
          label="정상 상태 (비교용)"
          defaultValue="apple"
        />
      </VStack>
    );
  },
  argTypes: {
    name: {
      control: false,
    },
    label: {
      control: false,
    },
    invalid: {
      control: false,
    },
    defaultValue: {
      control: false,
    },
  },
};

export const Hint: Story = {
  render: (args) => {
    return (
      <VStack gap="32">
        <RadioGroup
          {...args}
          name="hint-basic"
          label="좋아하는 과일을 선택하세요"
          hint="(옵션 선택)"
        />

        <RadioGroup
          {...args}
          name="hint-required"
          label="좋아하는 과일을 선택하세요"
          hint="(옵션 선택)"
          required
        />
      </VStack>
    );
  },
  argTypes: {
    name: {
      control: false,
    },
    label: {
      control: false,
    },
    hint: {
      control: false,
    },
    required: {
      control: false,
    },
  },
};

export const HelperText: Story = {
  render: (args) => {
    return (
      <VStack gap="32">
        <RadioGroup
          {...args}
          name="helper-text-basic"
          label="좋아하는 과일을 선택하세요"
          invalid
          required
          helperText="필수 값을 선택해주세요."
        />

        <RadioGroup
          {...args}
          name="helper-text-horizontal"
          label="좋아하는 과일을 선택하세요"
          orientation="horizontal"
          invalid
          helperText="필수 값을 선택해주세요."
        />
      </VStack>
    );
  },
  argTypes: {
    name: {
      control: false,
    },
    label: {
      control: false,
    },
    invalid: {
      control: false,
    },
    required: {
      control: false,
    },
  },
};

export const Required: Story = {
  render: (args) => {
    return (
      <VStack gap="32">
        <RadioGroup
          {...args}
          name="required-normal"
          label="필수 입력"
          required
        />

        <RadioGroup
          {...args}
          name="required-disabled"
          label="필수 입력 (비활성화)"
          required
          disabled
        />
      </VStack>
    );
  },
  argTypes: {
    name: {
      control: false,
    },
    label: {
      control: false,
    },
    required: {
      control: false,
    },
    disabled: {
      control: false,
    },
  },
};
