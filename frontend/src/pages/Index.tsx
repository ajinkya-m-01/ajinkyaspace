import { useState } from "react";
import HelloIntro from "@/components/HelloIntro";
import Home from "./Home";

const Index = () => {
  const alreadySeen = sessionStorage.getItem("introSeen");
  const [showIntro, setShowIntro] = useState(!alreadySeen);

  if (showIntro) {
    return <HelloIntro onComplete={() => setShowIntro(false)} />;
  }

  return <Home />;
};

export default Index;
