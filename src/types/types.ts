export type CartSize = 1 | 2;

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

export interface History {
  id: number;
  folio: string;
  cartTypeName: string;
  entryDate: string;
  exitDate: string | null;
  status: string;
}

export interface AvailableMonth {
  year: number;
  month: number;
  monthName: string;
  displayName: string;
}
