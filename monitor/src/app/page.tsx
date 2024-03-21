"use client";

import { runScrapers } from "@/service/scraper";

export default function Home() {
  const handleClickOnButton = async () => {
    await runScrapers();
  };

  return (
    <main>
      <button onClick={handleClickOnButton}>Call</button>
    </main>
  );
}
