import { useState } from "react";
import HelloIntro from "@/components/HelloIntro";
import Home from "./Home";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <HelloIntro onComplete={() => setShowIntro(false)} />;
  }

  return <Home />;
};

export default Index;
