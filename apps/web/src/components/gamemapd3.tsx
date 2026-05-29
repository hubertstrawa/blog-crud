"use client";

import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

// --- Definicje typów ---
type VillageType = "Osada" | "Surowce" | "Zagrożenie" | "Fort";

interface Village {
  id: number;
  name: string;
  x: number;
  y: number;
  points: number;
  owner: string;
  type: VillageType;
}

// --- Dane początkowe (Data State) ---
const INITIAL_VILLAGES: Village[] = [
  {
    id: 1,
    name: "Wioska startowa",
    x: 400,
    y: 300,
    points: 116,
    owner: "Gracz1",
    type: "Osada",
  },
  {
    id: 2,
    name: "Tartak",
    x: 200,
    y: 150,
    points: 45,
    owner: "Niezależne",
    type: "Surowce",
  },
  {
    id: 3,
    name: "Obóz bandytów",
    x: 600,
    y: 500,
    points: 0,
    owner: "NPC",
    type: "Zagrożenie",
  },
  {
    id: 4,
    name: "Kopalnia żelaza",
    x: 700,
    y: 200,
    points: 80,
    owner: "Niezależne",
    type: "Surowce",
  },
  {
    id: 5,
    name: "Wioska sojusznika",
    x: 350,
    y: 450,
    points: 340,
    owner: "Gracz2",
    type: "Osada",
  },
  {
    id: 6,
    name: "Zrujnowany Fort",
    x: 150,
    y: 600,
    points: 1500,
    owner: "Opuszczone",
    type: "Fort",
  },
  {
    id: 7,
    name: "Ukryta wioska",
    x: 850,
    y: 750,
    points: 800,
    owner: "Gracz3",
    type: "Osada",
  },
];

export default function GameMapD3() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);

  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);

  // --- Inicjalizacja D3 Zoom ---
  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;

    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);

    // Konfiguracja zachowania Zoom & Pan
    const zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3]) // Minimalne i maksymalne przybliżenie
      .on("zoom", (event) => {
        // Aplikowanie transformacji do głównej grupy <g>
        g.attr("transform", event.transform);
      });

    // Podpięcie zachowania pod element SVG
    svg.call(zoomBehavior);

    // (Opcjonalnie) Ustawienie początkowego przesunięcia, żeby wyśrodkować mapę
    // const initialTransform = d3.zoomIdentity.translate(100, 100).scale(1);
    // svg.call(zoomBehavior.transform, initialTransform);

    // Czyszczenie zdarzeń przy odmontowaniu komponentu
    return () => {
      svg.on(".zoom", null);
    };
  }, []);

  // --- Funkcje pomocnicze do rysowania ---
  const getColorByType = (type: VillageType) => {
    switch (type) {
      case "Osada":
        return "#3b82f6"; // Niebieski
      case "Surowce":
        return "#10b981"; // Zielony
      case "Zagrożenie":
        return "#ef4444"; // Czerwony
      case "Fort":
        return "#8b5cf6"; // Fioletowy
      default:
        return "#cbd5e1";
    }
  };

  const getShapeByType = (
    type: VillageType,
    x: number,
    y: number,
    isSelected: boolean,
  ) => {
    const strokeProps = isSelected
      ? { stroke: "#fbbf24", strokeWidth: 4 } // Złota obwódka dla zaznaczonego
      : { stroke: "#1e293b", strokeWidth: 2 }; // Ciemna obwódka domyślnie

    switch (type) {
      case "Osada":
      case "Fort":
        return (
          <circle
            cx={x}
            cy={y}
            r={16}
            fill={getColorByType(type)}
            {...strokeProps}
          />
        );
      case "Surowce":
        // Kwadrat wyśrodkowany
        return (
          <rect
            x={x - 14}
            y={y - 14}
            width={28}
            height={28}
            fill={getColorByType(type)}
            {...strokeProps}
            rx={4}
          />
        );
      case "Zagrożenie":
        // Trójkąt
        const path = `M ${x} ${y - 16} L ${x + 16} ${y + 14} L ${x - 16} ${y + 14} Z`;
        return (
          <path
            d={path}
            fill={getColorByType(type)}
            {...strokeProps}
            strokeLinejoin="round"
          />
        );
      default:
        return (
          <circle
            cx={x}
            cy={y}
            r={15}
            fill={getColorByType(type)}
            {...strokeProps}
          />
        );
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 bg-zinc-900 min-h-screen font-sans text-slate-200">
      <h1 className="text-3xl font-bold text-amber-500 mb-2">Mapa Taktyczna</h1>
      <p className="text-sm text-zinc-400 mb-6">
        Przeciągnij myszą, aby przesuwać. Użyj scrolla, aby przybliżać.
      </p>

      {/* Kontener Mapy (SVG) */}
      <div className="w-full h-[600px] border-4 border-zinc-700 bg-zinc-800 rounded-lg overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing">
        <svg ref={svgRef} className="w-full h-full">
          {/* Definicje SVG (Siatka / Grid) */}
          <defs>
            <pattern
              id="grid-pattern"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <rect
                width="50"
                height="50"
                fill="none"
                stroke="#3f3f46"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* Główna grupa, która podlega transformacjom D3 (Pan & Zoom) */}
          <g ref={gRef}>
            {/* Tło mapy z nałożoną siatką. Rozmiar musi być ogromny, aby symulować wielki świat */}
            <rect
              x="-5000"
              y="-5000"
              width="10000"
              height="10000"
              fill="url(#grid-pattern)"
            />

            {/* Renderowanie obiektów z Data State */}
            {INITIAL_VILLAGES.map((village) => (
              <g
                key={village.id}
                className="cursor-pointer transition-transform hover:scale-110 origin-center"
                style={{ transformOrigin: `${village.x}px ${village.y}px` }}
                onClick={() => setSelectedVillage(village)}
              >
                {/* Geometria wioski */}
                {getShapeByType(
                  village.type,
                  village.x,
                  village.y,
                  selectedVillage?.id === village.id,
                )}

                {/* Etykieta (Nazwa) */}
                <text
                  x={village.x}
                  y={village.y - 24}
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize="14px"
                  fontWeight="bold"
                  className="pointer-events-none select-none"
                  style={{
                    textShadow: "1px 1px 2px black, -1px -1px 2px black",
                  }}
                >
                  {village.name}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* Panel Szczegółów */}
      <div className="w-full mt-6 bg-zinc-800 border border-zinc-700 rounded-lg p-6 shadow-lg min-h-[160px]">
        <h2 className="text-xl font-semibold text-amber-400 border-b border-zinc-700 pb-2 mb-4">
          Inspektor Obiektu
        </h2>

        {selectedVillage ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-zinc-400 text-sm">Nazwa obiektu</p>
              <p className="text-lg font-bold text-white">
                {selectedVillage.name}
              </p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Właściciel</p>
              <p className="text-lg font-bold text-white">
                {selectedVillage.owner}
              </p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Punkty</p>
              <p className="text-lg font-bold text-emerald-400">
                {selectedVillage.points}
              </p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Typ</p>
              <p className="text-lg font-bold text-blue-400">
                {selectedVillage.type}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full pt-4">
            <p className="text-zinc-500 italic">
              Wybierz obiekt na mapie, aby zobaczyć szczegóły.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
