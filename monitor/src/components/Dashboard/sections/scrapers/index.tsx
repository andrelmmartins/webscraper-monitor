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

      <div className="text-sm font-medium bg-gray pt-5 pb-6 px-8 text-gray-medium-dark flex -mb-7 rounded-t-lg gap-1">
        <p className="w-[20%] line-clamp-1">Nome</p>
        <p className="w-[35%] line-clamp-1">Descrição</p>
        <p className="w-[10%] line-clamp-1">Duração Média</p>
        <p className="w-[100%] flex-1 line-clamp-1">Propriedades</p>
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
