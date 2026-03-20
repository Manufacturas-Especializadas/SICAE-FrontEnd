import { useState, type SyntheticEvent } from "react";
import type { CartSize, Entry } from "../../types/types";
import { Input } from "../CustomInputs/Input";
import { Selector } from "../CustomInputs/Selector";
import { useCartEntry } from "../../hooks/useCartEntry";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

export const EntryForm = ({ onSuccess, onCancel }: Props) => {
  const [folio, setFolio] = useState("");
  const [type, setType] = useState<CartSize>("Grande");
  const today = new Date().toLocaleDateString();

  const { registerEntry, isLoading } = useCartEntry();

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!folio.trim()) return;

    const entryData: Entry = {
      folio: folio.trim().toUpperCase(),
      cartTypeId: type === "Grande" ? 0 : 1,
    };

    await registerEntry(entryData, () => {
      setFolio("");
      onSuccess();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input label="Fecha de entrada (Auto)" value={today} disabled />
      </div>
      <div>
        <Input
          label="Folio"
          value={folio}
          onChange={(e) => setFolio(e.target.value.toUpperCase())}
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Seleccionar tipo de carro
        </label>
        <Selector selected={type} onChange={setType} />
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 px-4 py-3 border border-gray-300 
          rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-colors
          hover:cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-3 bg-blue-600 text-white 
          rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all 
          active:scale-95 hover:cursor-pointer"
        >
          Registrar entrada
        </button>
      </div>
    </form>
  );
};
