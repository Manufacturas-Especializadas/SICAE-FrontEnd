import { useState } from "react";
import { cartsService } from "../api/services/CartsService";
import toast from "react-hot-toast";
import type { AvailableMonth } from "../types/types";

export const useReportsCarts = () => {
  const [availableMonths, setAvailableMonths] = useState<AvailableMonth[]>([]);
  const [isLoadingMonths, setIsLoadingMonths] = useState(false);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const fetchMonths = async () => {
    setIsLoadingMonths(true);
    try {
      const data = await cartsService.getAvailableMonths();
      setAvailableMonths(data);
    } catch (error) {
      toast.error("Error al cargar la lista de meses");
    } finally {
      setIsLoadingMonths(false);
    }
  };
  const downloadMonthlyReport = async (
    year: number,
    month: number,
    reportId: string,
  ) => {
    try {
      setIsDownloading(reportId);
      await cartsService.getReport(year, month);
      toast.success("Reporte generado correctamente");
    } catch (error) {
      console.error("Error al descargar el reporte: ", error);
      toast.error("No se pudo generar el reporte");
    } finally {
      setIsDownloading(null);
    }
  };

  return {
    availableMonths,
    isLoadingMonths,
    isDownloading,
    downloadMonthlyReport,
    fetchMonths,
  };
};
