import { useCallback, useEffect } from "react";
import { Community } from "./marketing/Community";
import { Contribution } from "./marketing/Contribution";
import { Footer } from "./marketing/Footer";
import { Header } from "./marketing/Header";
import { How } from "./marketing/How";
import { Mission } from "./marketing/Mission";
import { Navigation } from "./marketing/Navigation";

function App() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const setHashNavigation = useCallback(
    (sectionId: string) => {
      window.history.pushState(null, "", `#${sectionId}`);
      scrollToSection(sectionId);
    },
    [scrollToSection],
  );

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) {
        return;
      }
      const sectionId = hash.slice(1);
      scrollToSection(sectionId);
    };

    requestAnimationFrame(() => {
      handleHashChange();
    });

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [scrollToSection]);

  return (
    <>
      <Navigation />
      <Header handleScrollToSection={setHashNavigation} />
      <Mission />
      <How />
      <Community />
      <Contribution />
      <Footer />
    </>
  );
}

export default App;
