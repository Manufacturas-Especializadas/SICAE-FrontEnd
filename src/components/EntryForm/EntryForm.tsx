import { useState, type SyntheticEvent } from "react";
import type { CartSize, CartUpdate, History } from "../../types/types";
import { Input } from "../CustomInputs/Input";
import { Selector } from "../CustomInputs/Selector";
import { useCartEntry } from "../../hooks/useCartEntry";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: History | null;
}

export const EntryForm = ({ onSuccess, onCancel, initialData }: Props) => {
  const [folio, setFolio] = useState(initialData?.folio || "");
  const [type, setType] = useState<CartSize>(
    initialData?.cartTypeName === "Grande" ? 1 : 2,
  );

  const isEditing = !!initialData;
  const { registerEntry, updateEntry, isLoading } = useCartEntry();

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!folio.trim()) return;

    const updateData: CartUpdate = {
      folio: folio.trim().toUpperCase(),
      cartTypeId: type,
    };

    if (isEditing && initialData) {
      await updateEntry(initialData.id, updateData, onSuccess);
    } else {
      await registerEntry(updateData, () => {
        setFolio("");
        onSuccess();
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className={isEditing ? "opacity-50" : ""}>
        <Input
          label={isEditing ? "Fecha Original" : "Fecha de entrada (Auto)"}
          value={
            isEditing
              ? new Date(initialData!.entryDate).toLocaleString()
              : new Date().toLocaleDateString()
          }
          disabled
        />
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
          Tipo de carro
        </label>
        <Selector selected={type} onChange={setType} />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`flex-1 px-4 py-3 text-white rounded-lg font-bold shadow-lg transition-all active:scale-95 cursor-pointer ${
            isEditing
              ? "bg-amber-500 hover:bg-amber-600 shadow-amber-100"
              : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
          }`}
        >
          {isLoading
            ? "Procesando..."
            : isEditing
              ? "Guardar Cambios"
              : "Registrar entrada"}
        </button>
      </div>
    </form>
  );
};
