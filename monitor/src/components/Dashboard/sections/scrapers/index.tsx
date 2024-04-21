"use client";
import { useState } from "react";

import Button from "@/components/Button";

import ScraperList from "./ScraperList";
import CreateModal from "./CreateModal";

export default function Scrapers() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-xl my-4 font-semibold">Scrapers Executando</h2>

      <div className="text-sm font-medium bg-gray pt-5 pb-6 px-5 text-gray-medium-dark flex -mb-7 rounded-t-lg">
        <p style={{ width: "25%" }}>Nome</p>
        <p style={{ width: "45%" }}>Descrição</p>
        <p style={{ width: "15%" }}>Duração Média</p>
      </div>
      <ScraperList />
      <div className="bg-gray px-5 pb-5 pt-5 -mt-2 rounded-b-lg ">
        <Button
          icon="code"
          className="bg-gray-darker"
          onClick={() => setIsCreating(true)}
        >
          Cadastrar
        </Button>
      </div>
      <CreateModal open={isCreating} onClose={() => setIsCreating(false)} />
    </section>
  );
}
