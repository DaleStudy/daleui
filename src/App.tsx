import logo from "/logo.svg";
import { css } from "../styled-system/css";
import { Button } from "./components/Button";

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
        <h1>Welcome Dale UI!</h1>
        <section>
          <h2>유용한 링크</h2>
          <ul>
            <li>
              <a href="https://main--675790d317ba346348aa3490.chromatic.com/">
                스토리북
              </a>
            </li>
            <li>
              <a href="https://github.com/DaleStudy/dale-ui">깃허브</a>
            </li>
            <li>
              <a href="https://github.com/DaleStudy/dale-ui/wiki">위키</a>
            </li>
            <li>
              <a href="https://github.com/DaleStudy/dale-ui/discussions">
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
          <h2>섹션 2</h2>
          <Button>클릭</Button>
        </section>
      </main>
      <footer>© 2024 Dale UI. All rights reserved.</footer>
    </div>
  );
}

export default App;
