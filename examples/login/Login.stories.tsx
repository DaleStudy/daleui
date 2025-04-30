import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../src/components/Button/Button";
import { Checkbox } from "../../src/components/Checkbox/Checkbox";
import { Heading } from "../../src/components/Heading/Heading";
import { Link } from "../../src/components/Link/Link";

export default {
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export const Default: StoryObj = {
  render: () => {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          action("on-submit")(event);
        }}
        style={{ width: 500 }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <Heading level={1}>안녕하세요, 회원이신가요?</Heading>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <input
            style={{
              border: "1px solid lightgray",
              borderRadius: "0.5rem",
              paddingLeft: "0.5rem",
              height: 50,
            }}
            required
            type="email"
            placeholder="이메일 주소"
          />
          <input
            style={{
              border: "1px solid lightgray",
              borderRadius: "0.5rem",
              paddingLeft: "0.5rem",
              height: 50,
            }}
            required
            type="password"
            placeholder="비밀번호"
          />
        </div>

        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link>비밀번호 찾기</Link>
          <Checkbox label="사용자 정보 기억하기" />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Button variant="solid" type="submit" size="lg">
            로그인
          </Button>
        </div>
      </form>
    );
  },
};
