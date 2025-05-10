import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import * as stories from "./Home.stories";
import { composeStories } from "@storybook/react";

const { Desktop } = composeStories(stories);

describe("Home", () => {
  test("홈 컴포넌트가 정상적으로 렌더링되어야 합니다", () => {
    render(<Desktop />);

    const logo = screen.getByAltText("DaleUI Logo");
    expect(logo).toBeInTheDocument();

    const mainTitle = screen.getByText("달레 UI");
    expect(mainTitle).toBeInTheDocument();

    const subTitle = screen.getByText("한국어 친화적인 디자인시스템");
    expect(subTitle).toBeInTheDocument();

    const inquiryButton = screen.getByText("문의하기");
    expect(inquiryButton).toBeInTheDocument();

    const footerText = screen.getByText("copyright DaleUI");
    expect(footerText).toBeInTheDocument();
  });

  test("네비게이션 메뉴가 존재해야 합니다", () => {
    render(<Desktop />);

    const menuItems = ["소개", "서비스", "스토리", "채용"];
    menuItems.forEach((item) => {
      const menuItem = screen.getByText(item);
      expect(menuItem).toBeInTheDocument();
    });
  });

  test("아이콘들이 존재해야 합니다", () => {
    render(<Desktop />);

    const searchIcon = screen.getByLabelText("검색");
    expect(searchIcon).toBeInTheDocument();

    const menuIcon = screen.getByLabelText("메뉴");
    expect(menuIcon).toBeInTheDocument();
  });
});
