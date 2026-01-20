import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { Radio, RadioGroup } from "./RadioGroup";

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

        <RadioGroup
          {...args}
          name="danger-tone"
          label="위험 색조 (Danger)"
          tone="danger"
        />

        <RadioGroup
          {...args}
          name="warning-tone"
          label="경고 색조 (Warning)"
          tone="warning"
        />

        <RadioGroup
          {...args}
          name="success-tone"
          label="성공 색조 (Success)"
          tone="success"
        />

        <RadioGroup
          {...args}
          name="info-tone"
          label="정보 색조 (Info)"
          tone="info"
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
