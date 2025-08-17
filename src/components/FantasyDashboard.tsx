import Image from 'next/image'
import FilterControls from './FilterControls'
import PlayerDataTable from './PlayerDataTable'

export default function FantasyDashboard() {
  return (
    <div className="bg-[#000000e6] min-h-screen w-full flex justify-center">
      <div className="bg-[#000000e6] w-full max-w-[1440px]">
        <div className="flex flex-col w-full min-h-screen">
          <header className="w-full h-24 bg-[#000000cc] flex items-center relative">
            <Image
              className="w-12 h-[41px] ml-[34px] object-cover"
              alt="Football icon"
              src="/football-icon-1.png"
              width={48}
              height={41}
            />
            <h1 className="ml-[70px] font-inter font-normal text-[#ffffffe6] text-2xl tracking-[0] leading-[normal]">
              Fantasy Football
            </h1>
          </header>

          <FilterControls />
          <PlayerDataTable />
        </div>
      </div>
    </div>
  )
}
