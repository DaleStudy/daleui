import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../components/Button/Button";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { Heading } from "../../components/Heading/Heading";
import { Link } from "../../components/Link/Link";
import { css } from "../../../styled-system/css";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { TextInput } from "../../components/TextInput/TextInput";

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
          const formData = new FormData(event.currentTarget);
          const data = Object.fromEntries(formData.entries());
          action("onSubmit")(data);
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
          <TextInput
            size="md" // TODO: 디자인 확인 필요
            required
            type="email"
            name="user_email"
            placeholder="이메일 주소"
          />
          <PasswordInput
            size="lg" // TODO: 디자인 확인 필요
            required
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
