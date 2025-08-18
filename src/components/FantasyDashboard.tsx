import React from "react";
import Image from "next/image";
import FilterControls from "./FilterControls";
import PlayerDataTable from "./PlayerDataTable";

/**
 * Main dashboard component orchestrating the fantasy football application layout.
 * Combines the header branding with the filter controls and player data sections,
 * establishing the visual hierarchy and responsive container structure.
 * 
 * @returns Complete dashboard layout with header, filters, and player data components
 */
export default function FantasyDashboard() {
  return (
    <>
      <header className="w-full h-24 flex items-center justify-center bg-black">
        <div className="max-w-[1440px] w-full flex">
          <Image
            className="w-12 h-[41px] ml-[34px] object-cover"
            alt="Football icon"
            src="/football-icon-1.png"
            width={48}
            height={41}
          />
          <h1 className="ml-[35px] font-inter font-normal text-white/90 text-2xl tracking-[0] leading-[48px]">
            Fantasy Football
          </h1>
        </div>
      </header>
      <div className="w-full flex flex-col items-center bg-neutral-900 pt-[68px]">
        <FilterControls />
        <PlayerDataTable />
      </div>
    </>
  );
}
