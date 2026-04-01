import { useEffect } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Download,
  FileText,
  Loader2,
} from "lucide-react";
import { useReportsCarts } from "../../hooks/useReportsCarts";

export const ReportsIndex = () => {
  const {
    isDownloading,
    downloadMonthlyReport,
    fetchMonths,
    isLoadingMonths,
    availableMonths,
  } = useReportsCarts();

  useEffect(() => {
    fetchMonths();
  }, []);

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="p-2 bg-white rounded-lg shadow-sm border 
              border-slate-200 text-slate-500 hover:text-blue-600 
              transition-all active:scale-90 cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              GESTIÓN DE REPORTES
            </h1>
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 
            text-white rounded-lg font-semibold text-xs hover:bg-emerald-700 
            transition-all shadow-sm active:scale-95 cursor-pointer"
            onClick={() => alert("Modal fechas")}
          >
            <CalendarDays size={14} />
            REPORTE POR FECHAS
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Historial Mensual
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {isLoadingMonths ? (
              <div
                className="flex flex-col items-center justify-center py-12 
                text-slate-400"
              >
                <Loader2
                  size={32}
                  className="animate-spin mb-4 text-blue-500"
                />
                <p className="text-sm font-medium">
                  Buscando meses disponibles...
                </p>
              </div>
            ) : availableMonths.length > 0 ? (
              availableMonths.map((report) => (
                <div
                  key={report.monthName}
                  className="group flex items-center justify-between px-6 py-3 
                  hover:bg-slate-50/80 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isDownloading === report.monthName
                          ? "bg-blue-100 text-blue-600"
                          : "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500"
                      }`}
                    >
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {report.displayName}
                      </p>
                      <p
                        className="text-[10px] text-slate-400 font-medium uppercase 
                        tracking-widest"
                      >
                        REF: {report.monthName}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      downloadMonthlyReport(
                        report.year,
                        report.month,
                        report.monthName,
                      )
                    }
                    disabled={isDownloading !== null}
                    className="flex items-center gap-2 px-3 py-1.5 text-emerald-600 
                    hover:bg-emerald-50 rounded-md font-bold text-xs transition-all 
                    disabled:opacity-50 cursor-pointer border border-transparent 
                    hover:border-emerald-100"
                  >
                    {isDownloading === report.monthName ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Download size={14} />
                    )}
                    <span>
                      {isDownloading === report.monthName
                        ? "GENERANDO..."
                        : "DESCARGAR"}
                    </span>
                  </button>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-500">
                <p className="text-sm">
                  No se encontraron registros en el historial.
                </p>
              </div>
            )}
          </div>

          <div
            className="px-6 py-3 bg-slate-50 border-t border-slate-100 
            rounded-b-xl flex justify-between items-center"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Sistemas MESA • 2026
            </span>
            <span className="text-[10px] text-slate-400 italic">
              v1.0.4-stable
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
