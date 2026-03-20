import { Truck, Package } from "lucide-react";
import type { CartSize } from "../../types/types";

interface Props {
  selected: CartSize;
  onChange: (size: CartSize) => void;
}

export const Selector = ({ selected, onChange }: Props) => {
  const options: { id: CartSize; icon: React.ReactNode; label: string }[] = [
    { id: 1, icon: <Truck size={24} />, label: "Carrito Grande" },
    { id: 2, icon: <Package size={24} />, label: "Carrito Chico" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={`flex flex-col items-center justify-center rounded-xl border-2 transition-all ${
            selected === opt.id
              ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
              : "border-gray-100 bg-white text-gray-500 hover:border-gray-200"
          }`}
        >
          {opt.icon}
          <span className="mt-2 font-medium">{opt.label}</span>
        </button>
      ))}
    </div>
  );
};
