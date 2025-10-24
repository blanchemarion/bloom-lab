import { useState } from "react";
import IntroPage from "./IntroPage";
import MainLanding from "./MainLanding";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return showIntro ? (
    <IntroPage onComplete={() => setShowIntro(false)} />
  ) : (
    <MainLanding />
  );
};

export default Index;
