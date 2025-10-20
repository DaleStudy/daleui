import { Navigation } from "./Navigation";
import { Header } from "./Header";
import { How } from "./How";
import { Community } from "./Community";
import { Contribution } from "./Contribution";
import { Footer } from "./Footer";
import { Mission } from "./Mission";

/**
 * DaleUI 마케팅 페이지
 *
 * Navigation, Header, How, Community, Contribution 섹션으로 구성됩니다.
 */
export function MarketingPage() {
  return (
    <>
      <Navigation />
      <Header />
      <Mission />
      <How />
      <Community />
      <Contribution />
      <Footer />
    </>
  );
}
