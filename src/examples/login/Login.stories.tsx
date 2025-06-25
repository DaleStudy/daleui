import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../components/Button/Button";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { Heading } from "../../components/Heading/Heading";
import { Link } from "../../components/Link/Link";
import { css } from "../../../styled-system/css";

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
          action("onSubmit")(event);
        }}
        className={css({ width: "500px" })}
      >
        <div className={css({ marginBottom: "32" })}>
          <Heading level={1}>안녕하세요, 회원이신가요?</Heading>
        </div>

        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "8",
            marginBottom: "16",
          })}
        >
          <input
            className={css({
              border: "1px solid lightgray",
              borderRadius: "md",
              paddingLeft: "8",
              height: 50,
            })}
            required
            type="email"
            name="user_email"
            placeholder="이메일 주소"
          />
          <input
            className={css({
              border: "1px solid lightgray",
              borderRadius: "md",
              paddingLeft: "8",
              height: 50,
            })}
            required
            type="password"
            name="user_password"
            placeholder="비밀번호"
          />
        </div>

        <div
          className={css({
            marginBottom: "16",
            display: "flex",
            justifyContent: "space-between",
          })}
        >
          <Link href="#">비밀번호 찾기</Link>
          <Checkbox label="사용자 정보 기억하기" />
        </div>

        <div
          className={css({
            display: "flex",
            justifyContent: "center",
            marginBottom: "32",
          })}
        >
          <Button variant="solid" type="submit" size="lg">
            로그인
          </Button>
        </div>
      </form>
    );
  },
};
