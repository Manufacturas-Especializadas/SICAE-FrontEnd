import { useCallback, useEffect, useState } from "react";
import { cartsService } from "../api/services/CartsService";
import toast from "react-hot-toast";
import type { History } from "../types/types";

export const useCarts = () => {
  const [history, setHistory] = useState<History[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await cartsService.getHistory();
      setHistory(data);
    } catch (error) {
      console.error("No se pudo cargar el historial de carritos");
      toast.error("No se pudo cargar el historial de carritos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    isLoading,
    refresh: fetchHistory,
  };
};
