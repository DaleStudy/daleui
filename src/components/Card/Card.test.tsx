import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Card } from "./Card";

describe("Card 렌더링", () => {
  test("기본 Card가 올바르게 렌더링됨", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Icon name="star" />
        </Card.Header>
        <Card.Body>
          <Card.Title>제목</Card.Title>
          <Card.Description>
            이 기능에 대한 설명을 여기에 작성합니다
          </Card.Description>
        </Card.Body>
      </Card>,
    );

    expect(screen.getByText("제목")).toBeInTheDocument();
    expect(
      screen.getByText("이 기능에 대한 설명을 여기에 작성합니다"),
    ).toBeInTheDocument();
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  test("아이콘이 올바르게 렌더링됨", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Icon name="star" />
        </Card.Header>
        <Card.Body>
          <Card.Title>테스트 제목</Card.Title>
          <Card.Description>테스트 설명</Card.Description>
        </Card.Body>
      </Card>,
    );

    expect(screen.getByLabelText("star")).toBeInTheDocument();
  });

  test("제목이 올바른 스타일로 렌더링됨", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Icon name="star" />
        </Card.Header>
        <Card.Body>
          <Card.Title>제목</Card.Title>
          <Card.Description>
            이 기능에 대한 설명을 여기에 작성합니다
          </Card.Description>
        </Card.Body>
      </Card>,
    );

    const title = screen.getByText("제목");
    expect(title).toHaveClass("fs_lg");
    expect(title).toHaveClass("fw_semibold");
  });

  test("설명이 올바른 스타일로 렌더링됨", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Icon name="star" />
        </Card.Header>
        <Card.Body>
          <Card.Title>제목</Card.Title>
          <Card.Description>
            이 기능에 대한 설명을 여기에 작성합니다
          </Card.Description>
        </Card.Body>
      </Card>,
    );

    const description = screen.getByText(
      "이 기능에 대한 설명을 여기에 작성합니다",
    );
    expect(description).toHaveClass("fs_md");
  });
});

describe("Card 스타일 속성", () => {
  test("tone 속성이 올바르게 적용됨", () => {
    render(
      <>
        <Card tone="neutral" outline>
          <Card.Header>
            <Card.Icon name="star" />
          </Card.Header>
          <Card.Body>
            <Card.Title>neutral</Card.Title>
            <Card.Description>neutral 카드</Card.Description>
          </Card.Body>
        </Card>
        <Card tone="brand" outline>
          <Card.Header>
            <Card.Icon name="star" />
          </Card.Header>
          <Card.Body>
            <Card.Title>brand</Card.Title>
            <Card.Description>brand 카드</Card.Description>
          </Card.Body>
        </Card>
      </>,
    );

    const articles = screen.getAllByRole("article");

    expect(articles[0]).toHaveClass("bd-c_border.neutral");
    expect(articles[1]).toHaveClass("bd-c_border.brand");
  });

  test("outline 속성이 올바르게 적용됨", () => {
    render(
      <>
        <Card outline={false}>
          <Card.Header>
            <Card.Icon name="star" />
          </Card.Header>
          <Card.Body>
            <Card.Title>테두리 없음</Card.Title>
            <Card.Description>테두리 없는 카드</Card.Description>
          </Card.Body>
        </Card>
        <Card outline={true}>
          <Card.Header>
            <Card.Icon name="star" />
          </Card.Header>
          <Card.Body>
            <Card.Title>테두리 있음</Card.Title>
            <Card.Description>테두리 있는 카드</Card.Description>
          </Card.Body>
        </Card>
      </>,
    );

    const articles = screen.getAllByRole("article");

    expect(articles[0]).toHaveClass("bd-w_0");
    expect(articles[1]).toHaveClass("bd-w_sm");
  });
});

describe("Card 구조", () => {
  test("Header, Body, Footer에 자유로운 children을 렌더링함", () => {
    render(
      <Card>
        <Card.Header>
          <span>헤더 콘텐츠</span>
        </Card.Header>
        <Card.Body>
          <span>본문 콘텐츠</span>
        </Card.Body>
        <Card.Footer>
          <button type="button">푸터 버튼</button>
        </Card.Footer>
      </Card>,
    );

    expect(screen.getByText("헤더 콘텐츠")).toBeInTheDocument();
    expect(screen.getByText("본문 콘텐츠")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "푸터 버튼" }),
    ).toBeInTheDocument();
  });

  test("Body만으로 렌더링됨", () => {
    render(
      <Card>
        <Card.Body>
          <Card.Title>제목</Card.Title>
        </Card.Body>
      </Card>,
    );

    expect(screen.getByText("제목")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  test("Root에는 padding이 없고 각 영역에 padding이 적용됨", () => {
    render(
      <Card>
        <Card.Header data-testid="header">
          <Card.Icon name="star" />
        </Card.Header>
        <Card.Body data-testid="body">
          <Card.Title>제목</Card.Title>
        </Card.Body>
        <Card.Footer data-testid="footer">
          <Card.Link href="#">자세히 보기</Card.Link>
        </Card.Footer>
      </Card>,
    );

    expect(screen.getByRole("article")).not.toHaveClass("p_24");
    for (const testId of ["header", "body", "footer"]) {
      const section = screen.getByTestId(testId);
      expect(section).toHaveClass("pt_24");
      expect(section).toHaveClass("px_12");
      expect(section).toHaveClass("last:pb_24");
    }
  });
});

describe("Card 링크", () => {
  test("링크가 올바르게 렌더링됨", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Icon name="info" />
        </Card.Header>
        <Card.Body>
          <Card.Title>링크 있는 카드</Card.Title>
          <Card.Description>링크가 포함된 Card입니다.</Card.Description>
        </Card.Body>
        <Card.Footer>
          <Card.Link href="#">자세히 보기</Card.Link>
        </Card.Footer>
      </Card>,
    );

    const link = screen.getByRole("link", { name: /자세히 보기/ });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#");
  });

  test("외부 링크가 올바르게 렌더링됨", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Icon name="externalLink" />
        </Card.Header>
        <Card.Body>
          <Card.Title>외부 링크 카드</Card.Title>
          <Card.Description>
            외부 사이트로 이동하는 링크입니다. 새 탭에서 열립니다.
          </Card.Description>
        </Card.Body>
        <Card.Footer>
          <Card.Link href="https://www.example.com" external>
            외부 사이트 방문
          </Card.Link>
        </Card.Footer>
      </Card>,
    );

    const externalLink = screen.getByRole("link", {
      name: /외부 사이트 방문/,
    });

    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(externalLink).toHaveAttribute("href", "https://www.example.com");
  });

  test("링크의 tone이 올바르게 적용됨", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Icon name="info" />
        </Card.Header>
        <Card.Body>
          <Card.Title>링크 있는 카드</Card.Title>
          <Card.Description>링크가 포함된 Card입니다.</Card.Description>
        </Card.Body>
        <Card.Footer>
          <Card.Link href="#">자세히 보기</Card.Link>
        </Card.Footer>
      </Card>,
    );

    const link = screen.getByRole("link", { name: /자세히 보기/ });
    expect(link).toHaveClass("c_fg.neutral");
  });

  test("링크가 없을 때는 표시되지 않음", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Icon name="star" />
        </Card.Header>
        <Card.Body>
          <Card.Title>제목</Card.Title>
          <Card.Description>
            이 기능에 대한 설명을 여기에 작성합니다
          </Card.Description>
        </Card.Body>
      </Card>,
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});

describe("Card 접근성", () => {
  test("Tab 키로 링크에 포커스할 수 있음", async () => {
    const user = userEvent.setup();
    render(
      <Card>
        <Card.Header>
          <Card.Icon name="info" />
        </Card.Header>
        <Card.Body>
          <Card.Title>링크 있는 카드</Card.Title>
          <Card.Description>링크가 포함된 Card입니다.</Card.Description>
        </Card.Body>
        <Card.Footer>
          <Card.Link href="#">자세히 보기</Card.Link>
        </Card.Footer>
      </Card>,
    );

    const link = screen.getByRole("link", { name: /자세히 보기/ });

    // Tab으로 링크에 포커스
    await user.tab();

    expect(link).toHaveFocus();
  });

  test("여러 카드가 있을 때 Tab으로 순차적으로 이동 가능", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Card>
          <Card.Header>
            <Card.Icon name="info" />
          </Card.Header>
          <Card.Body>
            <Card.Title>첫 번째 카드</Card.Title>
            <Card.Description>첫 번째 설명</Card.Description>
          </Card.Body>
          <Card.Footer>
            <Card.Link href="/first">첫 번째 링크</Card.Link>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Header>
            <Card.Icon name="star" />
          </Card.Header>
          <Card.Body>
            <Card.Title>두 번째 카드</Card.Title>
            <Card.Description>두 번째 설명</Card.Description>
          </Card.Body>
          <Card.Footer>
            <Card.Link href="/second">두 번째 링크</Card.Link>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Header>
            <Card.Icon name="award" />
          </Card.Header>
          <Card.Body>
            <Card.Title>세 번째 카드</Card.Title>
            <Card.Description>세 번째 설명</Card.Description>
          </Card.Body>
          <Card.Footer>
            <Card.Link href="/third">세 번째 링크</Card.Link>
          </Card.Footer>
        </Card>
      </div>,
    );

    const firstLink = screen.getByRole("link", { name: "첫 번째 링크" });
    const secondLink = screen.getByRole("link", { name: "두 번째 링크" });
    const thirdLink = screen.getByRole("link", { name: "세 번째 링크" });

    // Tab으로 순차적으로 이동
    await user.tab();
    expect(firstLink).toHaveFocus();

    await user.tab();
    expect(secondLink).toHaveFocus();

    await user.tab();
    expect(thirdLink).toHaveFocus();
  });

  test("Shift+Tab으로 역순으로 이동 가능", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Card>
          <Card.Header>
            <Card.Icon name="info" />
          </Card.Header>
          <Card.Body>
            <Card.Title>첫 번째 카드</Card.Title>
            <Card.Description>첫 번째 설명</Card.Description>
          </Card.Body>
          <Card.Footer>
            <Card.Link href="/first">첫 번째 링크</Card.Link>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Header>
            <Card.Icon name="star" />
          </Card.Header>
          <Card.Body>
            <Card.Title>두 번째 카드</Card.Title>
            <Card.Description>두 번째 설명</Card.Description>
          </Card.Body>
          <Card.Footer>
            <Card.Link href="/second">두 번째 링크</Card.Link>
          </Card.Footer>
        </Card>
      </div>,
    );

    const firstLink = screen.getByRole("link", { name: "첫 번째 링크" });
    const secondLink = screen.getByRole("link", { name: "두 번째 링크" });

    // 두 번째 링크로 이동
    await user.tab();
    await user.tab();
    expect(secondLink).toHaveFocus();

    // Shift+Tab으로 역순 이동
    await user.tab({ shift: true });
    expect(firstLink).toHaveFocus();
  });

  test("Enter 키로 링크 활성화 가능", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn((e: React.MouseEvent) => e.preventDefault());

    render(
      <Card>
        <Card.Header>
          <Card.Icon name="info" />
        </Card.Header>
        <Card.Body>
          <Card.Title>테스트 카드</Card.Title>
          <Card.Description>설명</Card.Description>
        </Card.Body>
        <Card.Footer>
          <Card.Link href="/test" onClick={handleClick}>
            테스트 링크
          </Card.Link>
        </Card.Footer>
      </Card>,
    );

    const link = screen.getByRole("link", { name: "테스트 링크" });

    // Tab으로 포커스
    await user.tab();
    expect(link).toHaveFocus();

    // Enter로 활성화
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
