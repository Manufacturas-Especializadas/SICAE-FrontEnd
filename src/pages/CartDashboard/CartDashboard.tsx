import { useState } from "react";
import type { CartLog } from "../../types/types";
import { CheckCircle, Package, Truck } from "lucide-react";
import { Modal } from "../../components/Modal/Modal";
import { EntryForm } from "../../components/EntryForm/EntryForm";

export const CartDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs] = useState<CartLog[]>([
    {
      id: 1,
      folio: "MESA-A102",
      type: "Grande",
      entryDate: "2026-03-18T08:30:00",
      status: "En planta",
    },
    {
      id: 2,
      folio: "MESA-B205",
      type: "Chico",
      entryDate: "2026-03-18T07:15:00",
      exitDate: "2026-03-18T09:45:00",
      status: "Completado",
    },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            MESA Packing Control
          </h1>
          <p className="text-gray-500 text-sm">
            Panel de seguimiento de carritos en tiempo real
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white 
          px-4 py-2 rounded-lg font-medium transition-all shadow-md
          hover:cursor-pointer"
        >
          + Nueva entrada
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Total"
          value={8}
          icon={<Truck className="text-blue-500" />}
        />
        <StatCard
          title="Total de carritos chicos"
          value={7}
          icon={<Package className="text-indigo-500" />}
        />
        <StatCard
          title="Salidas de hoy"
          value={12}
          icon={<CheckCircle className="text-green-500" />}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">
            Historial de movimiento
          </h2>
          <input
            type="text"
            placeholder="Buscar folio..."
            className="border border-gray-200 rounded-md px-3 py-1 text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Folio</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Detalles de entrada</th>
                <th className="px-6 py-4">Detalles de salida</th>
                <th className="px-6 py-4">Estatus</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {log.folio}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.type === "Grande"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(log.entryDate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {log.exitDate
                      ? new Date(log.exitDate).toLocaleString()
                      : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`flex items-center gap-1.5 ${
                        log.status === "En planta"
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${log.status === "En planta" ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {log.status === "En planta" && (
                      <button className="text-blue-600 hover:underline font-medium hover:cursor-pointer">
                        Registrar salida
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nueva entrada de carrito - MESA"
      >
        <EntryForm
          onSuccess={() => {
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div
    className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm 
    flex items-center justify-between"
  >
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
    </div>
    <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
  </div>
);
