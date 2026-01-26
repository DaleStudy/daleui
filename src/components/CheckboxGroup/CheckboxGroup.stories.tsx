import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { Button } from "../Button/Button";
import { VStack } from "../VStack/VStack";
import { CheckboxGroup, CheckboxItem } from "./CheckboxGroup";

export default {
  component: CheckboxGroup,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=6814-1500",
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
    defaultValues: ["banana"],
  },
};

export const Orientation: Story = {
  render: (args) => {
    return (
      <VStack gap="32">
        <CheckboxGroup
          {...args}
          name="vertical-orientation"
          orientation="vertical"
          defaultValues={["apple"]}
        />

        <CheckboxGroup
          {...args}
          name="horizontal-orientation"
          orientation="horizontal"
          defaultValues={["banana"]}
        />
      </VStack>
    );
  },
};

export const GroupDisabled: Story = {
  args: {
    disabled: true,
    defaultValues: ["banana"],
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
          defaultValues={["banana"]}
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
          defaultValues={["apple"]}
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
  render: (args) => {
    return (
      <div
        className={css({ display: "flex", flexDirection: "column", gap: "32" })}
      >
        <CheckboxGroup
          {...args}
          name="neutral-tone"
          label="중립 색조 (Neutral)"
          defaultValues={["apple"]}
          tone="neutral"
        />

        <CheckboxGroup
          {...args}
          name="brand-tone"
          label="브랜드 색조 (Brand)"
          defaultValues={["apple"]}
          tone="brand"
        />

        <CheckboxGroup
          {...args}
          name="danger-tone"
          label="위험 색조 (Danger)"
          defaultValues={["apple"]}
          tone="danger"
        />

        <CheckboxGroup
          {...args}
          name="warning-tone"
          label="경고 색조 (Warning)"
          defaultValues={["apple"]}
          tone="warning"
        />

        <CheckboxGroup
          {...args}
          name="success-tone"
          label="성공 색조 (Success)"
          defaultValues={["apple"]}
          tone="success"
        />

        <CheckboxGroup
          {...args}
          name="info-tone"
          label="정보 색조 (Info)"
          defaultValues={["apple"]}
          tone="info"
        />
      </div>
    );
  },
};

export const Invalid: Story = {
  render: (args) => {
    return (
      <div
        className={css({ display: "flex", flexDirection: "column", gap: "32" })}
      >
        <CheckboxGroup
          {...args}
          name="invalid-group"
          label="에러 상태 체크박스 그룹"
          invalid
        />

        <CheckboxGroup
          {...args}
          name="valid-group"
          label="정상 체크박스 그룹"
        />
      </div>
    );
  },
};

const ControlledCheckboxGroup = (
  args: React.ComponentProps<typeof CheckboxGroup>,
) => {
  const [values, setValues] = useState<string[]>(["apple"]);
  return (
    <div>
      <CheckboxGroup
        {...args}
        name="controlled-fruits"
        label="제어 컴포넌트 예시"
        values={values}
        onChange={(newValues) => setValues(newValues)}
      />
      <div className={css({ marginTop: "20" })}>
        <p>현재 선택된 값: {values.join(", ")}</p>
        <div className={css({ display: "flex", gap: "8", marginTop: "8" })}>
          <button onClick={() => setValues(["banana"])}>바나나만 선택</button>
          <button onClick={() => setValues(["apple", "orange"])}>
            사과와 오렌지 선택
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * `useState`와 함께 `values`, `onChange` prop을 사용하여 제어 컴포넌트로 만들 수 있습니다.
 */
export const Controlled: Story = {
  render: (args) => <ControlledCheckboxGroup {...args} />,
};

const RequiredCheckboxGroup = (
  args: React.ComponentProps<typeof CheckboxGroup>,
) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const selectedValues = formData.getAll("fruits") as string[];
    const isValid = selectedValues.length > 0;
    setIsInvalid(!isValid);
    action("form-submit")(
      `선택된 값: ${selectedValues.length > 0 ? selectedValues.join(", ") : "없음"}`,
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={css({ w: "280px", spaceY: "16" })}
    >
      <CheckboxGroup {...args} invalid={isInvalid} />
      {isInvalid && (
        <div className={css({ mt: "16", fontSize: "sm", color: "fg.danger" })}>
          <p>필수 항목을 선택해주세요.</p>
        </div>
      )}
      <Button type="submit">제출</Button>
    </form>
  );
};

/**
 * `required` prop을 `true`로 설정하면 필수 입력임을 나타냅니다.
 * 라벨 옆에 * 표시가 나타나며, 폼 제출 시 최소 하나의 옵션을 선택해야 합니다.
 */
export const Required: Story = {
  render: (args) => <RequiredCheckboxGroup {...args} />,
  argTypes: {
    required: {
      control: false,
    },
  },
  args: {
    required: true,
    name: "fruits",
    label: "좋아하는 과일을 선택하세요",
  },
};
