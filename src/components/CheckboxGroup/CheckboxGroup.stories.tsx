import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { Button } from "../Button/Button";
import { VStack } from "../VStack/VStack";
import { CheckboxGroup } from "./CheckboxGroup";

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
    disabled: false,
    tone: "brand",
    invalid: false,
    required: false,
    children: (
      <>
        <CheckboxGroup.Item value="apple">사과</CheckboxGroup.Item>
        <CheckboxGroup.Item value="banana">바나나</CheckboxGroup.Item>
        <CheckboxGroup.Item value="orange">오렌지</CheckboxGroup.Item>
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
      <VStack gap="32">
        <CheckboxGroup
          name="disabled-checked"
          label="개별 아이템 비활성화 (선택됨)"
          defaultValues={["banana"]}
        >
          <CheckboxGroup.Item value="apple">사과</CheckboxGroup.Item>
          <CheckboxGroup.Item value="banana" disabled>
            바나나 (disabled)
          </CheckboxGroup.Item>
          <CheckboxGroup.Item value="orange">오렌지</CheckboxGroup.Item>
        </CheckboxGroup>

        <CheckboxGroup
          name="disabled-unchecked"
          label="개별 아이템 비활성화 (선택 안 됨)"
          defaultValues={["apple"]}
        >
          <CheckboxGroup.Item value="apple">사과</CheckboxGroup.Item>
          <CheckboxGroup.Item value="banana" disabled>
            바나나 (disabled)
          </CheckboxGroup.Item>
          <CheckboxGroup.Item value="orange">오렌지</CheckboxGroup.Item>
        </CheckboxGroup>
      </VStack>
    );
  },
};

export const Tones: Story = {
  render: (args) => {
    return (
      <VStack gap="32">
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
      </VStack>
    );
  },
};

export const Invalid: Story = {
  render: (args) => {
    return (
      <VStack gap="32">
        <CheckboxGroup
          {...args}
          name="invalid-group"
          label="에러 상태 체크박스 그룹"
          invalid
          errorMessage="하나 이상 선택해주세요."
        />

        <CheckboxGroup
          {...args}
          name="valid-group"
          label="정상 체크박스 그룹"
        />
      </VStack>
    );
  },
};

export const HelperText: Story = {
  render: (args) => {
    return (
      <VStack gap="32">
        <CheckboxGroup
          {...args}
          name="helper-text-basic"
          label="좋아하는 과일을 선택하세요"
          helperText="여러 개를 선택할 수 있습니다."
        />

        <CheckboxGroup
          {...args}
          name="helper-text-required"
          label="좋아하는 과일을 선택하세요"
          required
          helperText="최소 하나 이상 선택해주세요."
        />
      </VStack>
    );
  },
  argTypes: {
    name: { control: false },
    label: { control: false },
    required: { control: false },
  },
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
 * `required`는 그룹 전체의 필수 입력을 시각적으로 표시합니다.
 * 실제 검증은 직접 구현해야 하며, 이 예제는 그 방법 중 하나를 보여줍니다.
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
