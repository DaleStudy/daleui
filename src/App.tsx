import { useEffect } from "react";
import { Community } from "./marketing/Community";
import { Contribution } from "./marketing/Contribution";
import { Footer } from "./marketing/Footer";
import Header from "./marketing/Header";
import { How } from "./marketing/How";
import { Mission } from "./marketing/Mission";
import { Navigation } from "./marketing/Navigation";

function App() {
  // 섹션으로 스크롤하는 공통 함수
  const scrollToSection = (sectionId: string) => {
    // URL에 해시 추가
    window.history.pushState(null, "", `#${sectionId}`);

    // 해당 영역으로 스크롤
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // 페이지 로드 시 해시 링크 처리
  useEffect(() => {
    const scrollToElement = (hash: string) => {
      if (!hash) {
        return;
      }

      const element = document.querySelector(hash);
      if (!element) {
        return;
      }

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      scrollToElement(hash);
    };

    requestAnimationFrame(() => {
      handleHashChange();
    });

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
      <Navigation />
      <Header handleScrollToSection={() => scrollToSection("mission")} />
      <Mission />
      <How />
      <Community />
      <Contribution />
      <Footer />
    </>
  );
}

export default App;
