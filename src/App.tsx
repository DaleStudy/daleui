import logo from "/logo.svg";
import { css } from "../styled-system/css";
import { Button } from "./components/Button";
import { Heading } from "./components/Heading";
import { Text } from "./components/Text";

function App() {
  return (
    <div
      className={css({
        maxW: "prose",
        mx: "auto",
      })}
    >
      <header>
        <a
          href="/"
          className={css({
            display: "flex",
            gap: "4",
          })}
        >
          <img src={logo} className="logo" alt="logo" />
          달레 UI
        </a>
      </header>
      <main>
        <Heading level={1}>Welcome Dale UI!</Heading>
        <section>
          <Heading level={2}>유용한 링크</Heading>
          <ul>
            <li>
              <a href="https://main--675790d317ba346348aa3490.chromatic.com/">
                스토리북
              </a>
            </li>
            <li>
              <a href="https://github.com/DaleStudy/daleui">깃허브</a>
            </li>
            <li>
              <a href="https://github.com/DaleStudy/daleui/wiki">위키</a>
            </li>
            <li>
              <a href="https://github.com/DaleStudy/daleui/discussions">
                게시판
              </a>
            </li>
            <li>
              <a href="https://discord.com/channels/775115965964222492/1280152682044063837">
                채팅방
              </a>
            </li>
          </ul>
        </section>
        <section>
          <Heading level={2}>섹션 2</Heading>
          <Button variant={"solid"}>클릭</Button>
        </section>
      </main>
      <footer>
        <Text muted>© 2024 Dale UI. All rights reserved.</Text>
      </footer>
    </div>
  );
}

export default App;
