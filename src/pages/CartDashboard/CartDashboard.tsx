import { useState } from "react";
import { CheckCircle, Package, Truck, Loader2 } from "lucide-react";
import { Modal } from "../../components/Modal/Modal";
import { EntryForm } from "../../components/EntryForm/EntryForm";
import { useCarts } from "../../hooks/useCarts";
import { formatDate } from "../../utils/formatDate";
import { useCartExit } from "../../hooks/useCartExit";
import { useNavigate } from "react-router-dom";

export const CartDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedFolio, setSelectedFolio] = useState<string | null>(null);
  const { history, isLoading, refresh } = useCarts();
  const { registerExit, isExiting } = useCartExit(() => {
    setIsConfirmOpen(false);
    refresh();
  });

  const handleOpenConfirm = (folio: string) => {
    setSelectedFolio(folio);
    setIsConfirmOpen(true);
  };

  const filteredHistory = history.filter((log) =>
    log.folio.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

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
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate("/reportes")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 
            py-2 rounded-lg font-medium transition-all shadow-md hover:cursor-pointer"
          >
            Reportes
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 
            py-2 rounded-lg font-medium transition-all shadow-md hover:cursor-pointer"
          >
            + Nueva entrada
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Activos"
          value={history.filter((h) => h.status === "InPlant").length}
          icon={<Truck className="text-blue-500" />}
        />
        <StatCard
          title="Carritos Grandes"
          value={
            history.filter(
              (h) => h.cartTypeName === "Grande" && h.status === "InPlant",
            ).length
          }
          icon={<Package className="text-indigo-500" />}
        />
        <StatCard
          title="Carritos Chicos"
          value={
            history.filter(
              (h) => h.cartTypeName === "Chico" && h.status === "InPlant",
            ).length
          }
          icon={<Package className="text-indigo-500" />}
        />
        <StatCard
          title="Salidas de Hoy"
          value={history.filter((h) => h.status === "Completed").length}
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
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-200 rounded-md px-3 py-1 text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Folio</th>
                <th className="px-6 py-4 text-center">Tipo</th>
                <th className="px-6 py-4 text-center">Detalles de entrada</th>
                <th className="px-6 py-4 text-center">Detalles de salida</th>
                <th className="px-6 py-4 text-center">Estatus</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                      <p className="font-medium">Cargando movimientos...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredHistory.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No se encontraron registros.
                  </td>
                </tr>
              ) : (
                currentItems.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {log.folio}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          log.cartTypeName === "Grande"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {log.cartTypeName}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center text-gray-600">
                      {formatDate(log.entryDate)}
                    </td>

                    <td className="px-6 py-4 text-center text-gray-600">
                      {formatDate(log.exitDate)}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 font-medium ${
                          log.status === "InPlant"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${log.status === "InPlant" ? "bg-green-500" : "bg-gray-300"}`}
                        />
                        {log.status === "InPlant" ? "En Planta" : "Completado"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      {log.status === "InPlant" && (
                        <button
                          className="text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer transition-colors"
                          onClick={() => handleOpenConfirm(log.folio)}
                        >
                          Registrar salida
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <p className="text-sm text-gray-500">
            Mostrando{" "}
            <span className="font-medium">{indexOfFirstItem + 1}</span> a{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, filteredHistory.length)}
            </span>{" "}
            de <span className="font-medium">{filteredHistory.length}</span>{" "}
            resultados
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-white border border-transparent hover:border-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
            </button>
          </div>
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
            refresh();
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirmar Salida"
      >
        <div className="p-2">
          <div
            className="flex items-center gap-3 text-amber-600 mb-4 bg-amber-50 p-3 
            rounded-lg border border-amber-100"
          >
            <Package size={24} />
            <p className="font-medium">
              Estás a punto de registrar la salida de este carrito.
            </p>
          </div>

          <p className="text-gray-600 mb-6">
            ¿Confirmas que el carrito con folio{" "}
            <span className="font-bold text-gray-900">{selectedFolio}</span> ha
            salido de la planta? Esta acción registrará la hora actual y no se
            puede deshacer.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
              text-gray-600 hover:bg-gray-50 font-medium transition-colors
              hover:cursor-pointer"
            >
              Cancelar
            </button>
            <button
              disabled={isExiting}
              onClick={() => selectedFolio && registerExit(selectedFolio)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg 
              font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95 
              disabled:opacity-50 hover:cursor-pointer"
            >
              {isExiting ? "Procesando..." : "Sí, registrar salida"}
            </button>
          </div>
        </div>
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
