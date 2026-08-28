"use client";

import { PawPrint } from "lucide-react";

interface HeaderProps {
  onReportClick: () => void;
}

export default function Header({ onReportClick }: HeaderProps) {
  return (
    <header className="glass sticky top-0 z-30 border-b border-white/40 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-md">
            <PawPrint className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="text-lg font-extrabold tracking-tight text-slate-800">
              Paw<span className="text-brand-primary">Finder</span>
            </p>
            <p className="hidden text-xs text-slate-500 sm:block">
              Comunidad de búsqueda y rescate
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Navegación principal">
          <a
            href="#mascotas"
            className="touch-target flex items-center rounded-full px-4 text-sm font-medium text-slate-600 hover:bg-white/70"
          >
            Mascotas
          </a>
          <a
            href="#estadisticas"
            className="touch-target flex items-center rounded-full px-4 text-sm font-medium text-slate-600 hover:bg-white/70"
          >
            Estadísticas
          </a>
        </nav>

        <button
          type="button"
          onClick={onReportClick}
          className="touch-target inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary px-5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
        >
          <PawPrint className="mr-1.5 h-4 w-4" aria-hidden="true" />
          Publicar Aviso
        </button>
      </div>
    </header>
  );
}
