import { vstack } from "../../../styled-system/patterns";
import { css } from "../../../styled-system/css";
import { Header } from "./Header";
import { MainContent } from "./MainContent";
import { Footer } from "./Footer";

const BACKGROUND_URL =
  "https://cdn.pixabay.com/photo/2022/08/31/15/05/seoul-7423574_640.jpg";

export function Home() {
  return (
    <div className={containerStyle}>
      <Header />
      <div className={contentStyle}>
        <div className={backgroundStyle} />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}

const containerStyle = vstack({ minHeight: "100vh", gap: 0 });

const contentStyle = vstack({
  flex: 1,
  width: "100%",
  position: "relative",
});

const backgroundStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: `url(${BACKGROUND_URL}) center/cover no-repeat`,
  filter: "brightness(0.5)",
  zIndex: 1,
});
