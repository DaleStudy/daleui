import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { CheckboxGroup, CheckboxItem } from "./CheckboxGroup";

export default {
  component: CheckboxGroup,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=851-1768",
    },
  },
  args: {
    name: "fruits",
    label: "좋아하는 과일을 선택하세요 (옵션 선택)",
    children: (
      <>
        <CheckboxItem value="apple">사과</CheckboxItem>
        <CheckboxItem value="banana">바나나</CheckboxItem>
        <CheckboxItem value="orange">오렌지</CheckboxItem>
      </>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof CheckboxGroup>;

type Story = StoryObj<typeof CheckboxGroup>;

export const Basic: Story = {};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: ["banana"],
  },
};

export const Orientation: Story = {
  render: () => {
    return (
      <div
        className={css({ display: "flex", flexDirection: "column", gap: "32" })}
      >
        <CheckboxGroup
          name="vertical-orientation"
          label="좋아하는 과일을 선택하세요 (옵션 선택)"
          orientation="vertical"
          defaultValue={["apple"]}
        >
          <CheckboxItem value="apple">사과</CheckboxItem>
          <CheckboxItem value="banana">바나나</CheckboxItem>
          <CheckboxItem value="orange">오렌지</CheckboxItem>
        </CheckboxGroup>

        <CheckboxGroup
          name="horizontal-orientation"
          label="좋아하는 과일을 선택하세요 (옵션 선택)"
          orientation="horizontal"
          defaultValue={["banana"]}
        >
          <CheckboxItem value="apple">사과</CheckboxItem>
          <CheckboxItem value="banana">바나나</CheckboxItem>
          <CheckboxItem value="orange">오렌지</CheckboxItem>
        </CheckboxGroup>
      </div>
    );
  },
};

export const GroupDisabled: Story = {
  args: {
    disabled: true,
    defaultValue: ["banana"],
    label: "전체 그룹 비활성화",
  },
};

export const ItemDisabled: Story = {
  render: () => {
    return (
      <div
        className={css({ display: "flex", flexDirection: "column", gap: "32" })}
      >
        <CheckboxGroup
          name="disabled-checked"
          label="개별 아이템 비활성화 (선택됨)"
          defaultValue={["banana"]}
        >
          <CheckboxItem value="apple">사과</CheckboxItem>
          <CheckboxItem value="banana" disabled>
            바나나 (disabled)
          </CheckboxItem>
          <CheckboxItem value="orange">오렌지</CheckboxItem>
        </CheckboxGroup>

        <CheckboxGroup
          name="disabled-unchecked"
          label="개별 아이템 비활성화 (선택 안 됨)"
          defaultValue={["apple"]}
        >
          <CheckboxItem value="apple">사과</CheckboxItem>
          <CheckboxItem value="banana" disabled>
            바나나 (disabled)
          </CheckboxItem>
          <CheckboxItem value="orange">오렌지</CheckboxItem>
        </CheckboxGroup>
      </div>
    );
  },
};

export const Tones: Story = {
  render: () => {
    return (
      <div
        className={css({ display: "flex", flexDirection: "column", gap: "32" })}
      >
        <CheckboxGroup
          name="neutral-tone"
          label="중립 색조 (Neutral)"
          defaultValue={["apple"]}
          tone="neutral"
        >
          <CheckboxItem value="apple">사과</CheckboxItem>
          <CheckboxItem value="banana">바나나</CheckboxItem>
          <CheckboxItem value="orange">오렌지</CheckboxItem>
        </CheckboxGroup>

        <CheckboxGroup
          name="brand-tone"
          label="브랜드 색조 (Brand)"
          defaultValue={["apple"]}
          tone="brand"
        >
          <CheckboxItem value="apple">사과</CheckboxItem>
          <CheckboxItem value="banana">바나나</CheckboxItem>
          <CheckboxItem value="orange">오렌지</CheckboxItem>
        </CheckboxGroup>

        <CheckboxGroup
          name="danger-tone"
          label="위험 색조 (Danger)"
          defaultValue={["apple"]}
          tone="danger"
        >
          <CheckboxItem value="apple">사과</CheckboxItem>
          <CheckboxItem value="banana">바나나</CheckboxItem>
          <CheckboxItem value="orange">오렌지</CheckboxItem>
        </CheckboxGroup>

        <CheckboxGroup
          name="warning-tone"
          label="경고 색조 (Warning)"
          defaultValue={["apple"]}
          tone="warning"
        >
          <CheckboxItem value="apple">사과</CheckboxItem>
          <CheckboxItem value="banana">바나나</CheckboxItem>
          <CheckboxItem value="orange">오렌지</CheckboxItem>
        </CheckboxGroup>

        <CheckboxGroup
          name="success-tone"
          label="성공 색조 (Success)"
          defaultValue={["apple"]}
          tone="success"
        >
          <CheckboxItem value="apple">사과</CheckboxItem>
          <CheckboxItem value="banana">바나나</CheckboxItem>
          <CheckboxItem value="orange">오렌지</CheckboxItem>
        </CheckboxGroup>

        <CheckboxGroup
          name="info-tone"
          label="정보 색조 (Info)"
          defaultValue={["apple"]}
          tone="info"
        >
          <CheckboxItem value="apple">사과</CheckboxItem>
          <CheckboxItem value="banana">바나나</CheckboxItem>
          <CheckboxItem value="orange">오렌지</CheckboxItem>
        </CheckboxGroup>
      </div>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    return (
      <div
        className={css({ display: "flex", flexDirection: "column", gap: "32" })}
      >
        <CheckboxGroup
          name="invalid-group"
          label="에러 상태 체크박스 그룹"
          invalid
        >
          <CheckboxItem value="apple">사과</CheckboxItem>
          <CheckboxItem value="banana">바나나</CheckboxItem>
          <CheckboxItem value="orange">오렌지</CheckboxItem>
        </CheckboxGroup>

        <CheckboxGroup name="valid-group" label="정상 체크박스 그룹">
          <CheckboxItem value="apple">사과</CheckboxItem>
          <CheckboxItem value="banana">바나나</CheckboxItem>
          <CheckboxItem value="orange">오렌지</CheckboxItem>
        </CheckboxGroup>
      </div>
    );
  },
};

export const Controlled = () => {
  const [value, setValue] = useState<string[]>(["apple"]);
  return (
    <div>
      <CheckboxGroup
        name="controlled-fruits"
        label="제어 컴포넌트 예시"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <CheckboxItem value="apple">사과</CheckboxItem>
        <CheckboxItem value="banana">바나나</CheckboxItem>
        <CheckboxItem value="orange">오렌지</CheckboxItem>
      </CheckboxGroup>
      <div className={css({ marginTop: "20" })}>
        <p>현재 선택된 값: {value.join(", ")}</p>
        <button onClick={() => setValue(["banana"])}>바나나만 선택</button>
        <button onClick={() => setValue(["apple", "orange"])}>
          사과와 오렌지 선택
        </button>
      </div>
    </div>
  );
};
