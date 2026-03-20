export type CartSize = "Grande" | "Chico";

export type CartStatus = "En planta" | "Completado";

export interface CartLog {
  id: number;
  folio: string;
  type: CartSize;
  entryDate: string;
  exitDate?: string;
  status: CartStatus;
}

export interface Entry {
  folio: string;
  cartTypeId: number;
}
