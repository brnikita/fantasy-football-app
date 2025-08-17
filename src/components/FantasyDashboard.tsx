import React from "react";
import Image from "next/image";
import FilterControls from "./FilterControls";
import PlayerDataTable from "./PlayerDataTable";

export default function FantasyDashboard() {
  return (
    <>
      <header className="w-full h-24 flex items-center justify-center">
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
