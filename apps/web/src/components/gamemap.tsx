// "use client";

// import React, { useRef, useEffect, useState } from "react";

// // Typy kafelków (Teren)
// type TileType = "GRASS" | "FOREST" | "DESERT" | "WATER" | "MOUNTAIN";

// interface Tile {
//   type: TileType;
//   color: string;
// }

// interface Village {
//   id: string;
//   name: string;
//   x: number; // współrzędna w siatce kafelków
//   y: number;
//   owner: string;
// }

// // Konfiguracja mapy
// const MAP_SIZE = 100; // Siatka 100x100 kafelków
// const TILE_SIZE = 64; // Bazowy rozmiar kafelka w pikselach

// export default function GameMap() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   // Stan transformacji mapy (pozycja X, Y oraz przybliżenie)
//   const [transform, setTransform] = useState({ x: 0, y: 0, zoom: 1 });
//   const [isDragging, setIsDragging] = useState(false);
//   const dragStart = useRef({ x: 0, y: 0 });

//   // Dane gry
//   const [mapGrid, setMapGrid] = useState<Tile[][]>([]);
//   const [villages, setVillages] = useState<Village[]>([]);
//   const [selectedElement, setSelectedElement] = useState<Village | Tile | null>(
//     null,
//   );

//   // 1. Inicjalizacja świata (Proceduralne generowanie terenu i wiosek)
//   useEffect(() => {
//     const grid: Tile[][] = [];
//     const tileTypes: { type: TileType; color: string }[] = [
//       { type: "GRASS", color: "#4a7c59" },
//       { type: "FOREST", color: "#284e3a" },
//       { type: "DESERT", color: "#dfc07d" },
//       { type: "WATER", color: "#2b5c8f" },
//       { type: "MOUNTAIN", color: "#7a7a7a" },
//     ];

//     for (let x = 0; x < MAP_SIZE; x++) {
//       grid[x] = [];
//       for (let y = 0; y < MAP_SIZE; y++) {
//         // Bardzo prosta symulacja biomów (pasami/grupami)
//         let choice = tileTypes[0]; // Domyślnie trawa

//         if (x < 15 && y < 25)
//           choice = tileTypes[3]; // Zbiornik wodny
//         else if (x > 60 && y > 60)
//           choice = tileTypes[2]; // Pustynia
//         else if ((x + y) % 13 === 0)
//           choice = tileTypes[1]; // Plamy lasów
//         else if (x % 19 === 0 && y % 17 === 0) choice = tileTypes[4]; // Góry

//         grid[x][y] = { type: choice.type, color: choice.color };
//       }
//     }
//     setMapGrid(grid);

//     // Przykładowe wioski rozrzucone po mapie
//     setVillages([
//       { id: "1", name: "Osada Startowa", x: 20, y: 20, owner: "Gracz_1" },
//       {
//         id: "2",
//         name: "Opuszczona Kopalnia",
//         x: 25,
//         y: 22,
//         owner: "Barbarzyńcy",
//       },
//       { id: "3", name: "Twierdza Pustynna", x: 75, y: 80, owner: "Sojusz_X" },
//       { id: "4", name: "Leśny Obóz", x: 45, y: 15, owner: "Gracz_2" },
//     ]);
//   }, []);

//   // 2. Pętla renderująca Canvas
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas || mapGrid.length === 0) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Czyszczenie ekranu
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     ctx.save();
//     // Aplikowanie Pan & Zoom
//     ctx.translate(transform.x, transform.y);
//     ctx.scale(transform.zoom, transform.zoom);

//     // Obliczanie widocznego obszaru (Culling), żeby nie rysować kafelków poza ekranem
//     const startX = Math.max(
//       0,
//       Math.floor(-transform.x / (TILE_SIZE * transform.zoom)),
//     );
//     const startY = Math.max(
//       0,
//       Math.floor(-transform.y / (TILE_SIZE * transform.zoom)),
//     );
//     const endX = Math.min(
//       MAP_SIZE,
//       startX + Math.ceil(canvas.width / (TILE_SIZE * transform.zoom)) + 1,
//     );
//     const endY = Math.min(
//       MAP_SIZE,
//       startY + Math.ceil(canvas.height / (TILE_SIZE * transform.zoom)) + 1,
//     );

//     // Rysowanie Terenu (Kafelków)
//     for (let x = startX; x < endX; x++) {
//       for (let y = startY; y < endY; y++) {
//         const tile = mapGrid[x][y];
//         ctx.fillStyle = tile.color;
//         ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

//         // Subtelna siatka (grid)
//         ctx.strokeStyle = "rgba(0,0,0,0.08)";
//         ctx.lineWidth = 1;
//         ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
//       }
//     }

//     // Rysowanie Wiosek / Struktur
//     villages.forEach((village) => {
//       // Sprawdzamy czy wioska mieści się w wyrenderowanym kadrze
//       if (
//         village.x >= startX &&
//         village.x <= endX &&
//         village.y >= startY &&
//         village.y <= endY
//       ) {
//         const posX = village.x * TILE_SIZE + TILE_SIZE / 2;
//         const posY = village.y * TILE_SIZE + TILE_SIZE / 2;

//         // Ciało wioski (Kwadrat z dachem w stylu retro strategii)
//         ctx.fillStyle = "#b5651d"; // Drewno/Cegła
//         ctx.fillRect(
//           village.x * TILE_SIZE + 16,
//           village.y * TILE_SIZE + 24,
//           32,
//           24,
//         );

//         // Dach
//         ctx.fillStyle = "#8b0000"; // Czerwony dach
//         ctx.beginPath();
//         ctx.moveTo(village.x * TILE_SIZE + 12, village.y * TILE_SIZE + 24);
//         ctx.lineTo(village.x * TILE_SIZE + 32, village.y * TILE_SIZE + 8);
//         ctx.lineTo(village.x * TILE_SIZE + 52, village.y * TILE_SIZE + 24);
//         ctx.fill();

//         // Podpis wioski
//         ctx.fillStyle = "#ffffff";
//         ctx.font = "bold 11px Arial";
//         ctx.textAlign = "center";
//         ctx.shadowColor = "black";
//         ctx.shadowBlur = 4;
//         ctx.fillText(village.name, posX, village.y * TILE_SIZE + 60);
//         ctx.shadowBlur = 0; // Reset cienia
//       }
//     });

//     ctx.restore();
//   }, [transform, mapGrid, villages]);

//   // 3. Obsługa Myszy - Przesuwanie (Pan)
//   const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     setIsDragging(true);
//     dragStart.current = {
//       x: e.clientX - transform.x,
//       y: e.clientY - transform.y,
//     };
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDragging) return;
//     setTransform((prev) => ({
//       ...prev,
//       x: e.clientX - dragStart.current.x,
//       y: e.clientY - dragStart.current.y,
//     }));
//   };

//   const handleMouseUpOrLeave = () => {
//     setIsDragging(false);
//   };

//   // 4. Obsługa Scrolla - Przybliżanie (Zoom) w punkt myszki
//   const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
//     e.preventDefault();
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;

//     const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
//     const newZoom = Math.max(0.3, Math.min(3, transform.zoom * zoomFactor));

//     // Matematyczne wyśrodkowanie zoomu na kursorze myszy
//     const worldX = (mouseX - transform.x) / transform.zoom;
//     const worldY = (mouseY - transform.y) / transform.zoom;

//     setTransform({
//       x: mouseX - worldX * newZoom,
//       y: mouseY - worldY * newZoom,
//       zoom: newZoom,
//     });
//   };

//   // 5. Obsługa kliknięcia - Detekcja co kliknął gracz
//   const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     // Jeśli gracz przeciągał mapę, nie traktuj tego jako kliknięcie w obiekt
//     if (Math.abs(e.clientX - dragStart.current.x - transform.x) > 5) return;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;

//     // Przeliczenie pikseli ekranu na współrzędne wirtualnego świata gry
//     const worldX = (mouseX - transform.x) / transform.zoom;
//     const worldY = (mouseY - transform.y) / transform.zoom;

//     // Przeliczenie pozycji świata na indeks kafelka (X, Y)
//     const tileX = Math.floor(worldX / TILE_SIZE);
//     const tileY = Math.floor(worldY / TILE_SIZE);

//     if (tileX >= 0 && tileX < MAP_SIZE && tileY >= 0 && tileY < MAP_SIZE) {
//       // Sprawdź czy na tym kafelku stoi wioska
//       const clickedVillage = villages.find(
//         (v) => v.x === tileX && v.y === tileY,
//       );

//       if (clickedVillage) {
//         setSelectedElement(clickedVillage);
//       } else {
//         // Jeśli nie wioska, to kliknięto pusty teren
//         setSelectedElement({
//           ...mapGrid[tileX][tileY],
//           x: tileX,
//           y: tileY,
//         } as any);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center bg-zinc-900 min-h-screen p-6 text-white font-sans">
//       <h1 className="text-2xl font-bold mb-2 text-amber-500">
//         Mapa Świata Plemion / The West (Next.js)
//       </h1>
//       <p className="text-sm text-zinc-400 mb-4">
//         Użyj myszki do przesuwania i scrolla do zoomowania.
//       </p>

//       {/* Kontener Mapy */}
//       <div className="border-4 border-amber-800 rounded-lg overflow-hidden shadow-2xl bg-black">
//         <canvas
//           ref={canvasRef}
//           width={800}
//           height={500}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUpOrLeave}
//           onMouseLeave={handleMouseUpOrLeave}
//           onWheel={handleWheel}
//           onClick={handleCanvasClick}
//           className="cursor-grab active:cursor-grabbing block"
//         />
//       </div>

//       {/* Panel szczegółów pod mapą */}
//       <div className="w-full max-w-[800px] mt-6 p-4 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg">
//         <h3 className="text-lg font-semibold text-amber-400 border-b border-zinc-700 pb-2 mb-3">
//           Inspektor Obiektu
//         </h3>
//         {selectedElement ? (
//           "owner" in selectedElement ? (
//             // Wyświetlanie informacji o wiosce
//             <div className="space-y-1">
//               <p className="text-xl font-bold text-emerald-400">
//                 {selectedElement.name}
//               </p>
//               <p>
//                 <span className="text-zinc-400">Koordynaty:</span> X:{" "}
//                 {selectedElement.x}, Y: {selectedElement.y}
//               </p>
//               <p>
//                 <span className="text-zinc-400">Właściciel:</span>{" "}
//                 {selectedElement.owner}
//               </p>
//               <button className="mt-3 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded transition">
//                 Wejdź do wioski
//               </button>
//             </div>
//           ) : (
//             // Wyświetlanie informacji o pustym terenie
//             <div>
//               <p className="text-lg font-medium">
//                 Teren:{" "}
//                 <span className="capitalize text-amber-200">
//                   {(selectedElement as any).type}
//                 </span>
//               </p>
//               <p className="text-sm text-zinc-400">
//                 Koordynaty kafelka: X: {(selectedElement as any).x}, Y:{" "}
//                 {(selectedElement as any).y}
//               </p>
//               <p className="text-xs text-zinc-500 mt-2">
//                 Ten obszar jest niezasiedlony. Możesz wysłać tu zwiad.
//               </p>
//             </div>
//           )
//         ) : (
//           <p className="text-zinc-400 italic text-center py-4">
//             Kliknij na dowolną wioskę lub kafelek terenu na mapie, aby zobaczyć
//             szczegóły.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
