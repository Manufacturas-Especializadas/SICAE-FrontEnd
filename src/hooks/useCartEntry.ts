import { useState } from "react";
import type { CartUpdate, Entry } from "../types/types";
import toast from "react-hot-toast";
import { cartsService } from "../api/services/CartsService";

export const useCartEntry = () => {
  const [isLoading, setIsLoading] = useState(false);

  const registerEntry = async (data: Entry, onSuccess?: () => void) => {
    setIsLoading(true);

    const toastId = toast.loading("Registrando entrada...");

    try {
      await cartsService.entry(data);

      toast.success("¡Carrito registrado correctamente!", { id: toastId });

      if (onSuccess) onSuccess();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error connceting to server";

      toast.error(errorMessage, { id: toastId });

      console.error("Error al registrar la entrada", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateEntry = async (
    id: number,
    data: CartUpdate,
    onSuccess?: () => void,
  ) => {
    setIsLoading(true);
    const toastId = toast.loading("Actualizando registro...");
    try {
      await cartsService.update(id, data);
      toast.success("¡Registro actualizado!", { id: toastId });
      if (onSuccess) onSuccess();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Error al actualizar";
      toast.error(msg, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerEntry,
    updateEntry,
    isLoading,
  };
};
