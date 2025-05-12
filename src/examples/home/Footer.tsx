import { css } from "../../../styled-system/css";
import { Text } from "../../components/Text/Text";

export function Footer() {
  return (
    <footer className={footerStyle}>
      <Text>copyright DaleUI</Text>
    </footer>
  );
}
const footerStyle = css({
  textAlign: "center",
  paddingY: { base: 1, md: 2 },
  background: "teal.1",
  borderTop: "2px solid",
  borderColor: "teal.2",
  width: "100%",
});
