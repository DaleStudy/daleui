import logo from "/logo.svg";
import { css } from "../styled-system/css";
import { Button } from "./components/Button/Button";
import { Heading } from "./components/Heading/Heading";
import { Link } from "./components/Link/Link";
import { Text } from "./components/Text/Text";

function App() {
  return (
    <div
      className={css({
        maxW: "prose",
        mx: "auto",
      })}
    >
      <header>
        <Link
          href={"/"}
          className={css({
            display: "flex",
            gap: "4",
          })}
        >
          <img src={logo} className="logo" alt="logo" />
          달레 UI
        </Link>
      </header>
      <main>
        <Heading level={1}>Welcome Dale UI!</Heading>
        <section>
          <Heading level={2}>유용한 링크</Heading>
          <ul>
            <li>
              <Link
                href={"https://main--675790d317ba346348aa3490.chromatic.com/"}
                underline={false}
              >
                스토리북
              </Link>
            </li>
            <li>
              <Link
                href={"https://github.com/DaleStudy/daleui"}
                underline={false}
              >
                깃허브
              </Link>
            </li>
            <li>
              <Link
                href={"https://github.com/DaleStudy/daleui/wiki"}
                underline={false}
              >
                위키
              </Link>
            </li>
            <li>
              <Link
                href={"https://github.com/DaleStudy/daleui/discussions"}
                underline={false}
              >
                게시판
              </Link>
            </li>
            <li>
              <Link
                href={
                  "https://discord.com/channels/775115965964222492/1280152682044063837"
                }
                underline={false}
              >
                채팅방
              </Link>
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
