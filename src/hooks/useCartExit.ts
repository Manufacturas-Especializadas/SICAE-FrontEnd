import { useState } from "react";
import toast from "react-hot-toast";
import { cartsService } from "../api/services/CartsService";

export const useCartExit = (onSuccess: () => void) => {
  const [isExiting, setIsExiting] = useState(false);

  const registerExit = async (folio: string) => {
    setIsExiting(true);

    const toastId = toast.loading(`Registrando salidas de ${folio}...`);

    try {
      await cartsService.exit(folio);

      toast.success(`¡Salida exitosa del folio ${folio}`, { id: toastId });
      onSuccess();
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "No se pudo registrar la salida";

      toast.error(msg, { id: toastId });
    } finally {
      setIsExiting(false);
    }
  };

  return {
    registerExit,
    isExiting,
  };
};
