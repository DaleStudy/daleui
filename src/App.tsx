import { Community } from "./marketing/Community";
import { Contribution } from "./marketing/Contribution";
import { Footer } from "./marketing/Footer";
import Header from "./marketing/Header";
import { How } from "./marketing/How";
import { Mission } from "./marketing/Mission";
import { Navigation } from "./marketing/Navigation";

function App() {
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

export default App;
