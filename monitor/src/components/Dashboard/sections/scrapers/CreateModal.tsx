import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { Scraper } from "@/model/Dashboard";
import { useDashboard } from "@/contexts/DashboardContext";
import Select from "@/components/Select";
import Input from "@/components/Input";

export default function CreateModal(props: {
  open: boolean;
  onClose: () => void;
}) {
  const { data, createInstance } = useDashboard();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    let error = false;

    Object.keys(scraperProps).forEach((prop) => {
      if (!scraperProps[prop]) {
        error = true;
        setErrors((prev) => ({
          ...prev,
          [prop]: `O campo <strong>${prop}</strong> é necessário`,
        }));
      }
    });

    if (!error && template) {
      setLoading(true);
      createInstance({ name: template.name, props: scraperProps });
      setLoading(false);
      handleClose();
    }
  };

  const [template, setTemplate] = useState<Scraper>();

  useEffect(() => {
    if (template) {
      setScraperProps(template.props);
      setErrors(template.props);
    }
  }, [template]);

  const [scraperProps, setScraperProps] = useState<Scraper["props"]>({});
  const [errors, setErrors] = useState<Scraper["props"]>({});

  const handleClose = () => {
    props.onClose();
    setTimeout(() => {
      setTemplate(undefined);
      setScraperProps({});
      setErrors({});
    }, 300); // wait modal close
  };

  return (
    <Modal open={props.open} onClose={handleClose} title="Cadastrar Scraper">
      <div className="flex flex-col gap-2 border-b pb-6 mb-2 border-gray">
        <h2 className="text-md font-semibold">Selecione o scraper:</h2>
        <Select
          value={template?.name ?? ""}
          placeholder="Selecione"
          onSelect={setTemplate}
          options={data.scrapers.map((scraper) => ({
            label: scraper.name,
            value: scraper,
          }))}
        />
      </div>

      <div>
        {template && Object.keys(template.props).length > 0 && (
          <div className="border-b pb-6 mb-6 border-gray flex flex-col gap-4">
            <h2 className="text-md font-semibold">Preencha os campos</h2>
            <p className="text-xs text-gray-medium-dark -mt-3">
              * Todos eles são necessários para o funcionamento do Scraper
            </p>
            <div className="flex flex-col gap-1">
              {Object.keys(template.props).map((name, i) => (
                <Input
                  key={`input-${i}`}
                  error={errors[name]}
                  placeholder={name}
                  onChange={(e) =>
                    setScraperProps((prev) => ({
                      ...prev,
                      [name]: e.target.value,
                    }))
                  }
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Button
            onClick={onSubmit}
            type="submit"
            className="w-full h-12 justify-center"
          >
            Cadastrar
          </Button>
          <Button
            type="button"
            onClick={handleClose}
            className="bg-white !text-gray-darker w-full h-12 justify-center hover:bg-gray"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
